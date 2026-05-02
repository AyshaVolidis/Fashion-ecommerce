const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('./src/models/Product');

const sampleProducts = [
  {
    name: 'Nike Air Max 270',
    description: 'Iconic Nike Air Max 270 running shoes with premium comfort and sleek design. Perfect for sports and casual wear.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 120
  },
  {
    name: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation, superior sound quality, and all-day comfort.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    stock: 85
  },
  {
    name: 'Luxury Skincare Set',
    description: 'Complete skincare collection with premium moisturizers, serums, and treatments for radiant and healthy skin.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/10825665/pexels-photo-10825665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    stock: 150
  },
  {
    name: 'iPhone 15 Pro Max',
    description: 'Latest iPhone 15 Pro Max with stunning 6.7" display, A17 Pro chip, advanced camera system, and all-day battery life.',
    price: 1199.99,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 45
  },
  {
    name: 'Premium White T-Shirt',
    description: 'Luxurious 100% organic cotton white t-shirt with perfect fit and superior comfort. Ideal for everyday wear.',
    price: 39.99,
    image: 'https://images.pexels.com/photos/3622629/pexels-photo-3622629.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 250
  },
  {
    name: 'Elegant Black Evening Dress',
    description: 'Stunning black evening dress with sophisticated design, perfect for special occasions and formal events.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 60
  },
  {
    name: 'Professional DSLR Camera',
    description: 'High-end professional DSLR camera with 45MP sensor, 4K video, and advanced autofocus system. Perfect for photographers.',
    price: 1899.99,
    image: 'https://images.pexels.com/photos/606941/pexels-photo-606941.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 25
  },
  {
    name: 'Colorful Summer Dress',
    description: 'Vibrant and comfortable summer dress with beautiful floral patterns, perfect for warm weather.',
    price: 79.99,
    image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 120
  },
  {
    name: 'Premium Leather Crossbody Bag',
    description: 'Handcrafted leather crossbody bag with elegant design, durable construction, and timeless style.',
    price: 189.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 50
  },
  {
    name: 'Vintage Denim Jacket',
    description: 'Classic vintage-inspired denim jacket with perfect wash, comfortable fit, and timeless appeal.',
    price: 119.99,
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    stock: 95
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    console.log('Clearing existing products...');
    await Product.deleteMany({});

    console.log('Seeding products...');
    const inserted = await Product.insertMany(sampleProducts);
    console.log(`✓ Successfully inserted ${inserted.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
