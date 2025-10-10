const mongoose = require('mongoose');
const Service = require('./models/service.model');

async function removeServices() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://utkarshdwivedi13092005_db_user:UQx9fUBOaBZl4ruz@cluster0.fwytjx1.mongodb.net/fixify_app?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Remove Custom Carpentry Work and Auto Mechanic Service
    const result = await Service.deleteMany({
      name: { $in: ['Custom Carpentry Work', 'Auto Mechanic Service'] }
    });

    console.log(`Removed ${result.deletedCount} services`);
    process.exit(0);
  } catch (error) {
    console.error('Error removing services:', error);
    process.exit(1);
  }
}

removeServices();