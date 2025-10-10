const mongoose = require('mongoose');
const Service = require('./models/service.model');

// New services with HD images
const newServices = [
  {
    name: 'Professional Plumbing Service',
    category: 'plumber',
    description: 'Expert plumbing solutions for all your water and drainage needs. 24/7 emergency service available.',
    price: 500,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'Home Electrical Repair',
    category: 'electrician',
    description: 'Licensed electricians for safe and reliable electrical installations and repairs.',
    price: 600,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'AC & Appliance Technician',
    category: 'technician',
    description: 'Professional repair and maintenance for all home appliances and air conditioning systems.',
    price: 450,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'Custom Carpentry Work',
    category: 'carpenter',
    description: 'Skilled carpenters for furniture making, repairs, and custom woodwork projects.',
    price: 700,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1581092795442-6d4b9dde4d1a?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'Interior & Exterior Painting',
    category: 'painter',
    description: 'Professional painting services with premium quality paints and expert finishing.',
    price: 400,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'Auto Mechanic Service',
    category: 'mechanic',
    description: 'Complete automotive repair and maintenance services for all vehicle types.',
    price: 800,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581092446461-fbe1b2d5b5a2?w=800&h=600&fit=crop&crop=center'
  }
];

async function replaceAllServices() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://utkarshdwivedi13092005_db_user:UQx9fUBOaBZl4ruz@cluster0.fwytjx1.mongodb.net/fixify_app?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');

    // Delete all existing services
    await Service.deleteMany({});
    console.log('Deleted all existing services');

    // Create new services
    const createdServices = await Service.insertMany(newServices);
    console.log(`Created ${createdServices.length} new services with HD images`);

    console.log('All services replaced successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error replacing services:', error);
    process.exit(1);
  }
}

replaceAllServices();