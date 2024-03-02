// routes/userRoutes.js

const express = require('express');
const  User  = require('../models/databaseModel'); // Adjust the path based on your project structure

const router = express.Router();

router.post('/user/sign-up', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Ensure that the User model is properly imported
    if (!User) {
      return res.status(500).json({ error: 'Internal Server Error', details: 'User model is undefined' });
    }

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      // User already exists
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      message: 'User added successfully',
      newUser,
    });
  } catch (err) {
    console.error('Error in User route:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
