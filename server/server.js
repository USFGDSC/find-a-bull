const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./route/userRoute');
const itemRoutes = require('./route/itemRoute');
const path = require('path');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());

// Serve static files (for image uploads)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api', userRoutes);
app.use('/api', itemRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
