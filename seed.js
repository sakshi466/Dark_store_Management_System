// import bcrypt from 'bcrypt'
// import User from './models/User.js'
// import connectDB from './db/connection.js'


// const register = async () =>
// {

//     try {
//          await connectDB();
//          const hashedPassword = await bcrypt.hash('password123', 10);
//          const newUser = new User({
//              name: 'admin',
//              email: 'admin@example.com',
//              password: hashedPassword,
//              address:'admin address', 
//              role:'admin'
//          });

//          await newUser.save();
//          console.log('User registered successfully');

//     } catch (error) {
//         console.error('Database connection failed:', error);
//         process.exit(1);
//     }

// }

// register();

import dotenv from "dotenv";
dotenv.config();

import bcrypt from 'bcrypt';
import User from './models/User.js';
import connectDB from './db/connection.js';

const register = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash('password123', 10);

    const newUser = new User({
      name: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      address: 'admin address',
      role: 'admin'
    });

    await newUser.save();
    console.log("User registered successfully");
    process.exit(0);
    
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

register();