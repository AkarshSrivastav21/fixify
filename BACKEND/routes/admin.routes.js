const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const adminMiddleware = require('../middleware/admin.middleware');

// Admin login
router.post('/login', adminController.adminLogin);

// Protected admin routes
router.get('/dashboard', adminMiddleware.authAdmin, adminController.getDashboardStats);
router.get('/users', adminMiddleware.authAdmin, adminController.getAllUsers);
router.get('/providers', adminMiddleware.authAdmin, adminController.getAllProviders);
router.get('/bookings', adminMiddleware.authAdmin, adminController.getAllBookings);
router.get('/services', adminMiddleware.authAdmin, adminController.getAllServices);

// Add operations
router.post('/users', adminMiddleware.authAdmin, adminController.addUser);
router.post('/providers', adminMiddleware.authAdmin, adminController.addProvider);
router.post('/services', adminMiddleware.authAdmin, adminController.addService);

// Update operations
router.put('/services/:serviceId', adminMiddleware.authAdmin, adminController.updateService);

// Delete operations
router.delete('/users/:userId', adminMiddleware.authAdmin, adminController.deleteUser);
router.delete('/providers/:providerId', adminMiddleware.authAdmin, adminController.deleteProvider);
router.delete('/services/:serviceId', adminMiddleware.authAdmin, adminController.deleteService);

// Update booking
router.put('/bookings/:bookingId', adminMiddleware.authAdmin, adminController.updateBookingStatus);

// Provider stats for homepage
router.get('/provider-stats', adminController.getProviderStats);

// Provider analytics
router.get('/provider-analytics/:providerId', adminController.getProviderAnalytics);

// Booking analytics
router.get('/booking-analytics', adminMiddleware.authAdmin, adminController.getBookingAnalytics);

module.exports = router;