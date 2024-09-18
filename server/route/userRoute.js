const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const router = express.Router();

// Middleware to protect routes using JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// POST /api/register - User registration
router.post('/register', async (req, res) => {
  const { uNumber, email, password } = req.body;

  // Validate request body
  if (!uNumber || !password) {
    return res.status(400).json({ message: 'U-number and password are required' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ uNumber });
    if (existingUser) {
      return res.status(409).json({ message: 'User with this U-number already exists' });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      uNumber,
      email,
      passwordHash,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/login - User login and JWT token generation
router.post('/login', async (req, res) => {
  const { uNumber, password } = req.body;

  if (!uNumber || !password) {
    return res.status(400).json({ message: 'U-number and password are required' });
  }

  try {
    // Find user by U-number
    const user = await User.findOne({ uNumber });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(403).json({ message: 'Invalid U-number or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id, uNumber: user.uNumber }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Protected route example - Get user profile (JWT token required)
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({
      uNumber: user.uNumber,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
