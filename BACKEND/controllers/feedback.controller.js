const feedbackModel = require("../models/feedback.model");
const bookingModel = require("../models/bookings.model");

// Submit feedback
const submitFeedback = async (req, res) => {
  try {
    const { bookingId, rating, comment, serviceCategory } = req.body;
    const userId = req.user._id;

    console.log('Feedback submission request:', { bookingId, rating, comment, serviceCategory, userId });

    let providerId = null;
    let finalServiceCategory = serviceCategory || 'general';

    if (bookingId) {
      // Feedback for a specific booking
      const booking = await bookingModel.findById(bookingId).populate("providerId");
      if (!booking) {
        return res.status(400).json({ message: "Booking not found" });
      }

      if (booking.status !== "completed") {
        return res.status(400).json({ message: "Booking is not completed yet" });
      }

      if (booking.userId.toString() !== userId.toString()) {
        return res.status(403).json({ message: "Unauthorized to submit feedback for this booking" });
      }

      providerId = booking.providerId._id;
      finalServiceCategory = serviceCategory || booking.category;
    } else {
      // General feedback
      console.log('Submitting general feedback');
    }

    const feedback = new feedbackModel({
      userId,
      providerId,
      bookingId,
      rating,
      comment,
      serviceCategory: finalServiceCategory
    });

    await feedback.save();
    console.log('Feedback saved successfully:', feedback._id);
    res.status(201).json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error('Error in submitFeedback:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all feedback (for admin)
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await feedbackModel.find()
      .populate("userId", "fullname email")
      .populate("providerId", "fullname profession")
      .populate("bookingId", "category details")
      .sort({ createdAt: -1 });

    console.log('Feedback found:', feedback.length);
    res.json({ success: true, feedbacks: feedback });
  } catch (error) {
    console.error('Error in getAllFeedback:', error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback
};