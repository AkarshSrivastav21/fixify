const mongoose = require('mongoose');
const Service = require('./models/service.model');

// HD Images for each service category
const serviceImages = {
  plumber: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=600&fit=crop&crop=center'
  ],
  electrician: [
    'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1609205807107-171c2e6e4e5c?w=800&h=600&fit=crop&crop=center'
  ],
  technician: [
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&h=600&fit=crop&crop=center'
  ],
  carpenter: [
    'https://images.unsplash.com/photo-1581092795442-6d4b9dde4d1a?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092446461-fbe1b2d5b5a2?w=800&h=600&fit=crop&crop=center'
  ],
  painter: [
    'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=600&fit=crop&crop=center'
  ],
  mechanic: [
    'https://images.unsplash.com/photo-1581092446461-fbe1b2d5b5a2?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&h=600&fit=crop&crop=center',
    'https://images.unsplash.com/photo-1581092795442-6d4b9dde4d1a?w=800&h=600&fit=crop&crop=center'
  ]
};

async function updateServiceImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/fixify');
    console.log('Connected to MongoDB');

    // Get all services
    const services = await Service.find();
    console.log(`Found ${services.length} services`);

    // Update each service with a new HD image
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      const categoryImages = serviceImages[service.category];
      
      if (categoryImages && categoryImages.length > 0) {
        // Pick a random image from the category
        const randomImage = categoryImages[Math.floor(Math.random() * categoryImages.length)];
        
        await Service.findByIdAndUpdate(service._id, {
          image: randomImage
        });
        
        console.log(`Updated ${service.name} with new image`);
      }
    }

    console.log('All services updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating services:', error);
    process.exit(1);
  }
}

updateServiceImages();