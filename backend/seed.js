const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('./models/userModel');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const generateUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});

    // Create super admin
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'superadmin@example.com',
      password: 'superadmin123',
      role: 'superadmin',
    });

    // Create admins
    const admins = await Promise.all(
      Array.from({ length: 10 }, (_, i) =>
        User.create({
          name: `Admin ${i + 1}`,
          email: `admin${i + 1}@example.com`,
          password: 'admin123',
          role: 'admin',
        })
      )
    );

    // Create customers
    const customers = await Promise.all(
      Array.from({ length: 5 }, (_, i) =>
        User.create({
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          password: 'customer123',
          role: 'customer',
        })
      )
    );

    console.log('Seed data created successfully:');
    console.log('Super Admin:', superAdmin.email);
    console.log('Admins:', admins.map((admin) => admin.email));
    console.log('Customers:', customers.map((customer) => customer.email));

    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
connectDB().then(() => {
  generateUsers();
}); 