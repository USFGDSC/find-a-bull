const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./route/userRoute');
const itemRoutes = require('./route/itemRoute');

// Load environment variables from .env file
dotenv.config({ path: '../.env' }); // Adjust the path based on your project structure


// Initialize Express app
const app = express();

// Middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());

// Set the views engine
app.set('view engine', 'ejs');

// Check if MONGO_URI is defined
if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the .env file');
  process.exit(1); // Exit the process if the MONGO_URI is missing
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if connection to MongoDB fails
});

// Routes
app.use(userRoutes);
app.use(itemRoutes);
// Server test
app.get('/test', (req, res) => {
    res.render('test');
});

// Test cookies
app.get('/set-cookies', (req, res) => {
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge : 1000 * 60 * 60, httpOnly: true });
  res.send('You got the cookies!');

});
app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  res.json(cookies)
})
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
