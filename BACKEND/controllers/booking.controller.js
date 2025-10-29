const Booking = require("../models/bookings.model");
const Utility = require("../models/utility.model");
const User = require("../models/user.model");
const emailService = require("../services/email.service");

exports.createBooking = async (req, res) => {
  try {
    const body = req.body;
    if (!body) return res.status(400).json({ message: "Request body missing" });

    const { userId, category, serviceId, location, details, preferredDate, preferredTime } = body;

    // Validate required fields
    if (!userId || !category || !serviceId || !location)
      return res.status(400).json({ message: "Missing required booking fields" });

    // Find active provider with same profession
    const provider = await Utility.findOne({
      profession: category.toLowerCase(),
      status: "active",
    });

    console.log(` Looking for active ${category.toLowerCase()} provider`);
    console.log(`Found provider:`, provider ? `${provider.fullname.firstname} (${provider.status})` : 'None');

    if (!provider)
      return res.status(404).json({ message: "No active provider available for this service" });

    // Get user details for email
    const user = await User.findById(userId);
    
    // Save booking
    const booking = new Booking({
      userId,
      providerId: provider._id,
      serviceId,
      category,
      location,
      status: "pending",
      details: details || "",
      preferredDate,
      preferredTime,
    });

    await booking.save();

    // Notify provider via socket.io
    if (provider.socketId && global.io) {
      global.io.to(provider.socketId).emit("newBooking", booking);
    }

    // Send email notification to provider
    if (user && provider.email) {
      const bookingDetails = {
        category,
        customerName: `${user.fullname.firstname} ${user.fullname.lastname}`,
        location,
        preferredDate,
        preferredTime,
        details
      };
      
      emailService.sendBookingNotificationToProvider(
        provider.email,
        `${provider.fullname.firstname} ${provider.fullname.lastname}`,
        bookingDetails
      );
    }

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.bookingAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    const booking = await Booking.findById(id).populate('userId', 'fullname email').populate('providerId', 'fullname email contact');
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (action === "accept") {
      booking.status = "confirmed";
      
      // Send confirmation email to user
      if (booking.userId && booking.providerId) {
        const bookingDetails = {
          category: booking.category,
          location: booking.location,
          preferredDate: booking.preferredDate,
          preferredTime: booking.preferredTime
        };
        
        const providerDetails = {
          name: `${booking.providerId.fullname.firstname} ${booking.providerId.fullname.lastname}`,
          email: booking.providerId.email,
          contact: booking.providerId.contact
        };
        
        emailService.sendBookingConfirmationToUser(
          booking.userId.email,
          `${booking.userId.fullname.firstname} ${booking.userId.fullname.lastname}`,
          bookingDetails,
          providerDetails
        );
      }
    } else if (action === "reject") {
      // Find another active provider with same profession immediately
      const excludeProviders = [...(booking.rejectedBy || []), booking.providerId];
      const newProvider = await Utility.findOne({
        profession: booking.category.toLowerCase(),
        status: "active",
        _id: { $nin: excludeProviders } // Exclude current and previously rejected providers
      });

      if (newProvider) {
        // Add current provider to rejected list first
        booking.rejectedBy = booking.rejectedBy || [];
        booking.rejectedBy.push(booking.providerId);
        
        // Reassign to new provider immediately
        booking.providerId = newProvider._id;
        booking.status = "pending";
        booking.updatedAt = new Date();
        
        // Save booking first
        await booking.save();
        
        // Then notify new provider via socket.io immediately
        if (newProvider.socketId && global.io) {
          const freshBooking = {
            ...booking.toObject(),
            _id: booking._id,
            userId: booking.userId,
            providerId: newProvider._id,
            status: "pending",
            isReassigned: true,
            updatedAt: new Date()
          };
          global.io.to(newProvider.socketId).emit("newBooking", freshBooking);
        }
        
        // Send email notification to new provider (async, don't wait)
        if (booking.userId && newProvider.email) {
          const bookingDetails = {
            category: booking.category,
            customerName: `${booking.userId.fullname.firstname} ${booking.userId.fullname.lastname}`,
            location: booking.location,
            preferredDate: booking.preferredDate,
            preferredTime: booking.preferredTime,
            details: booking.details
          };
          
          // Don't await this - send async
          emailService.sendBookingNotificationToProvider(
            newProvider.email,
            `${newProvider.fullname.firstname} ${newProvider.fullname.lastname}`,
            bookingDetails
          ).catch(err => console.log('Email send error:', err));
        }
        
        console.log(`Booking ${booking._id} reassigned from ${booking.rejectedBy[booking.rejectedBy.length-1]} to ${newProvider._id}`);
      } else {
        // No other provider available
        booking.status = "rejected";
        console.log(`No other active ${booking.category} provider available`);
      }
    } else if (action === "complete") {
      booking.status = "completed";
    } else if (action === "cancel") {
      booking.status = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid action" });
    }

    await booking.save();

    res.json({ message: `Booking ${booking.status}`, booking });
  } catch (err) {
    console.error("❌ Error in bookingAction:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update booking status (for cancellation, etc.)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: `Booking ${status}`, booking });
  } catch (err) {
    console.error("❌ Error in updateBookingStatus:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get provider’s bookings
exports.getProviderBookings = async (req, res) => {
  try {
    const { providerId } = req.params;
    const bookings = await Booking.find({ providerId })
      .populate('userId', 'fullname email phone')
      .sort({ createdAt: -1 });
    res.json({ bookings });
  } catch (err) {
    console.error("❌ Error in getProviderBookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Example: Get all bookings for a user
exports.getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("providerId", "fullname email contact"); // populate provider details

    res.status(200).json({ bookings });
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ message: "Server error" });
  }
};
