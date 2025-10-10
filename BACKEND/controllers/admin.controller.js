const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const Utility = require('../models/utility.model');
const Booking = require('../models/bookings.model');
const Service = require('../models/service.model');
const Feedback = require('../models/feedback.model');

// Admin login
exports.adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
   

    const admin = await Admin.findOne({ username }).select('+password');
   
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await admin.comparePassword(password);
   
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = admin.generateAuthToken();
    res.json({ token, admin: { id: admin._id, username: admin.username, role: admin.role } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Dashboard stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProviders = await Utility.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalServices = await Service.countDocuments();
    const activeProviders = await Utility.countDocuments({ status: 'active' });
    const pendingBookings = await Booking.countDocuments({ status: 'pending' });
    const completedBookings = await Booking.countDocuments({ status: 'completed' });

    // Category-wise active providers with details
    const activeProvidersByCategory = await Utility.aggregate([
      { $match: { status: 'active' } },
      {
        $group: {
          _id: '$profession',
          count: { $sum: 1 },
          providers: {
            $push: {
              name: { $concat: ['$fullname.firstname', ' ', '$fullname.lastname'] },
              email: '$email',
              contact: '$contact',
              experience: '$experience'
            }
          }
        }
      },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalUsers,
      totalProviders,
      totalBookings,
      totalServices,
      activeProviders,
      pendingBookings,
      completedBookings,
      activeProvidersByCategory
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await User.countDocuments();

    res.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all providers
exports.getAllProviders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const providers = await Utility.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Utility.countDocuments();

    res.json({
      providers,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const bookings = await Booking.find()
      .populate('userId', 'fullname email phone')
      .populate('providerId', 'fullname email contact profession')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments();

    res.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new user
exports.addUser = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, password } = req.body;
    
    const hashedPassword = await require('bcrypt').hash(password, 10);
    
    const user = new User({
      fullname: { firstname, lastname },
      email,
      phone,
      password: hashedPassword
    });
    
    await user.save();
    res.status(201).json({ message: 'User added successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add new provider
exports.addProvider = async (req, res) => {
  try {
    const { firstname, lastname, email, contact, profession, experience, password } = req.body;
    
    const hashedPassword = await require('bcrypt').hash(password, 10);
    
    const provider = new Utility({
      fullname: { firstname, lastname },
      email,
      contact,
      profession: profession.toLowerCase(),
      experience,
      password: hashedPassword,
      status: 'active'
    });
    
    await provider.save();
    res.status(201).json({ message: 'Provider added successfully', provider });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete provider
exports.deleteProvider = async (req, res) => {
  try {
    const { providerId } = req.params;
    await Utility.findByIdAndDelete(providerId);
    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const services = await Service.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Service.countDocuments();

    res.json({
      services,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add new service
exports.addService = async (req, res) => {
  try {
    const { name, category, description, price, image } = req.body;
    
    const service = new Service({
      name,
      category: category.toLowerCase(),
      description,
      price,
      image
    });
    
    await service.save();
    res.status(201).json({ message: 'Service added successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    await Service.findByIdAndDelete(serviceId);
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, category, description, price, image } = req.body;
    
    const service = await Service.findByIdAndUpdate(
      serviceId,
      {
        name,
        category: category.toLowerCase(),
        description,
        price,
        image
      },
      { new: true }
    );
    
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    ).populate('userId', 'fullname email')
     .populate('providerId', 'fullname email');

    res.json({ message: 'Booking updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider stats for homepage
exports.getProviderStats = async (req, res) => {
  try {
    const totalProviders = await Utility.countDocuments();
    const activeProviders = await Utility.countDocuments({ status: 'active' });
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    
    // Calculate average rating from feedback
    const avgRatingResult = await Feedback.aggregate([
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    const avgRating = avgRatingResult.length > 0 ? avgRatingResult[0].avgRating : 4.8;
    
    // Get recent testimonials
    const testimonials = await Feedback.find({ rating: { $gte: 4 } })
      .populate('userId', 'fullname')
      .populate('providerId', 'fullname profession')
      .sort({ createdAt: -1 })
      .limit(6);

    res.json({
      totalProviders,
      activeProviders,
      totalBookings,
      completedBookings,
      avgRating: Math.round(avgRating * 10) / 10,
      testimonials
    });
  } catch (error) {
    console.error('Provider stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get provider analytics
exports.getProviderAnalytics = async (req, res) => {
  try {
    const { providerId } = req.params;
    
    const bookings = await Booking.find({ providerId });
    const total = bookings.length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const confirmed = bookings.filter(b => b.status === 'confirmed').length;
    
    const successRate = total > 0 ? Math.round(((completed + confirmed) / total) * 100) : 0;
    
    const providerFeedback = await Feedback.find({ providerId });
    const avgRating = providerFeedback.length > 0 
      ? Math.round((providerFeedback.reduce((sum, f) => sum + f.rating, 0) / providerFeedback.length) * 10) / 10
      : 4.8;
    
    const baseRate = 500;
    const todayBookings = bookings.filter(b => {
      const today = new Date();
      const bookingDate = new Date(b.createdAt);
      return bookingDate.toDateString() === today.toDateString() && b.status === 'completed';
    }).length;
    
    const thisWeekBookings = bookings.filter(b => {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return new Date(b.createdAt) >= weekAgo && b.status === 'completed';
    }).length;
    
    const thisMonthBookings = bookings.filter(b => {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return new Date(b.createdAt) >= monthAgo && b.status === 'completed';
    }).length;
    
    res.json({
      successRate,
      avgResponseTime: '2.5h',
      avgRating,
      earnings: {
        today: todayBookings * baseRate,
        thisWeek: thisWeekBookings * baseRate,
        thisMonth: thisMonthBookings * baseRate,
        total: completed * baseRate
      }
    });
  } catch (error) {
    console.error('Provider analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get booking analytics
exports.getBookingAnalytics = async (req, res) => {
  try {
    const now = new Date();
    
    // Daily data (last 7 days)
    const dailyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const startOfDay = new Date(date.setHours(0, 0, 0, 0));
      const endOfDay = new Date(date.setHours(23, 59, 59, 999));
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      
      dailyData.push({
        label: startOfDay.toLocaleDateString('en-US', { weekday: 'short' }),
        value: count
      });
    }
    
    // Weekly data (last 4 weeks)
    const weeklyData = [];
    for (let i = 3; i >= 0; i--) {
      const startOfWeek = new Date(now);
      startOfWeek.setDate(startOfWeek.getDate() - (i * 7) - startOfWeek.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(endOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: startOfWeek, $lte: endOfWeek }
      });
      
      weeklyData.push({
        label: `Week ${4 - i}`,
        value: count
      });
    }
    
    // Monthly data (last 6 months)
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const startOfMonth = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth }
      });
      
      monthlyData.push({
        label: startOfMonth.toLocaleDateString('en-US', { month: 'short' }),
        value: count
      });
    }
    
    // Yearly data (last 3 years)
    const yearlyData = [];
    for (let i = 2; i >= 0; i--) {
      const year = now.getFullYear() - i;
      const startOfYear = new Date(year, 0, 1);
      const endOfYear = new Date(year, 11, 31, 23, 59, 59, 999);
      
      const count = await Booking.countDocuments({
        createdAt: { $gte: startOfYear, $lte: endOfYear }
      });
      
      yearlyData.push({
        label: year.toString(),
        value: count
      });
    }
    
    res.json({
      daily: dailyData,
      weekly: weeklyData,
      monthly: monthlyData,
      yearly: yearlyData
    });
  } catch (error) {
    console.error('Booking analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};