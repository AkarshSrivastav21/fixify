const mongoose = require('mongoose');
const Service = require('./models/service.model');

// Sample services with HD images
const sampleServices = [
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
  },
  {
    name: 'Emergency Plumbing',
    category: 'plumber',
    description: '24/7 emergency plumbing service for urgent repairs and installations.',
    price: 650,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'Smart Home Electrician',
    category: 'electrician',
    description: 'Modern electrical solutions including smart home installations and automation.',
    price: 750,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800&h=600&fit=crop&crop=center'
  },
  {
    name: 'HVAC Technician',
    category: 'technician',
    description: 'Heating, ventilation, and air conditioning specialists for optimal home comfort.',
    price: 550,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop&crop=center'
  }
];

async function createSampleServices() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/fixify');
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Create new services
    const createdServices = await Service.insertMany(sampleServices);
    console.log(`Created ${createdServices.length} sample services with HD images`);

    console.log('Sample services created successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error creating services:', error);
    process.exit(1);
  }
}

createSampleServices();