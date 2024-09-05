const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const Item = require('../models/itemModel.js');
const router = express.Router();

// Middleware for JWT authentication
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

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// POST /api/items - Create a new lost/found item report
router.post('/items', authenticateToken, upload.single('image'), async (req, res) => {
  const { itemName, description, status, foundLocation, depositLocation } = req.body;

  if (!itemName || !status || !foundLocation || !depositLocation) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

    const newItem = new Item({
      userId: req.user.userId, // Get userId from JWT token
      itemName,
      description,
      status,
      foundLocation,
      depositLocation,
      imageUrl,
    });

    await newItem.save();
    res.status(201).json({ message: 'Item reported successfully', newItem });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/items - Retrieve all items (with optional filtering)
router.get('/items', async (req, res) => {
  const { status, foundLocation, itemName } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (foundLocation) filter.foundLocation = foundLocation;
  if (itemName) filter.itemName = new RegExp(itemName, 'i'); // case-insensitive search

  try {
    const items = await Item.find(filter);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/items/:id - Retrieve specific item details by ID
router.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/upload - Dedicated image upload endpoint
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No image file uploaded' });
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

module.exports = router;
