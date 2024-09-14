const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');
const router = express.Router();
// Middleware to protect routes using JWT

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) { // Forbidden
      return res.sendStatus(403);
    } else {
      console.log(decodedToken);
      req.user = decodedToken;
      next();
    }
  });
};

// GET / - Open the website landing page
router.get('/', (req, res) => {
  res.render('home');
})
// GET /register - Open the register page
router.get('/register', async (req, res) => {
  res.render('register')
})
// POST /register - User registration
router.post('/register', async (req, res) => {
  const {uNumber, email, password} = req.body;
  console.log(req.body);
  // Validate request body
  if (!uNumber || !email || !password) {
    return res.status(400).json({ message: 'U-number, email, password are required' });
  }

  // Check if the user already exists
  const existingEmail = await User.findOne({email});
  if (existingEmail) {
    return res.status(409).json({ message: 'User with this email already exists' });
  }
  const existingUNumber = await User.findOne({uNumber});
  if (existingUNumber) {
    return res.status(409).json({message: 'User with this U-number already exists'});
  }
  try {
    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      uNumber,
      email,
      passwordHash,
    });
    console.log(newUser);

    await newUser.save();

    res.status(201).json({message: 'User registered successfully'});
  }
  catch (error) {
  console.error(error); // Optional: Log the error to the server console for debugging
  res.status(500).json({ error: error.message });
}
  });
// GET /reSuccess - Open the account registration success page
router.get('/register-success',(req, res) => {
  res.render('reSuccess');
});
router.get('/login', (req, res) => {
  res.render('login');
});
// POST /login - User login and JWT token generation
router.post('/login', async (req, res) => {
  const { uNumber, email, password } = req.body;
  // Validate request body
  if (!uNumber || !email || !password) {
    return res.status(400).json({ message: 'U-number, gmail and password are required' });
  }
  try {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Compare passwords
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(403).json({message: 'Invalid password'});
  }
  // Generate a JWT token
  let token = jwt.sign({ userId: user._id, uNumber: user.uNumber, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
  res.json({ message: 'Login successful'});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

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
