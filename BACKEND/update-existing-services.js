const mongoose = require('mongoose');
const Service = require('./models/service.model');

// HD Images for each service category
const serviceImages = {
  plumber: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
  electrician: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&crop=center',
  technician: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&crop=center',
  carpenter: 'https://images.unsplash.com/photo-1581092795442-6d4b9dde4d1a?w=800&h=600&fit=crop&crop=center',
  painter: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&crop=center',
  mechanic: 'https://images.unsplash.com/photo-1581092446461-fbe1b2d5b5a2?w=800&h=600&fit=crop&crop=center'
};

async function updateExistingServices() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/fixify');
    console.log('Connected to MongoDB');

    // Get all services
    const services = await Service.find();
    console.log(`Found ${services.length} services`);

    // Update each service with a new HD image
    for (let service of services) {
      const newImage = serviceImages[service.category];
      
      if (newImage) {
        await Service.findByIdAndUpdate(service._id, {
          image: newImage
        });
        
        console.log(`Updated ${service.name} (${service.category}) with new HD image`);
      }
    }

    console.log('All services updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateExistingServices();