// Install Node.js, Express, and MongoDB on your machine.

// Create a new project folder and initialize it with npm.

// Create a server.js file and import the necessary modules.
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const bcrypt = require('bcrypt');
const path = require('path');


// Serve static files from the "public" directory
app.use(express.static('public'));

// Route for user dashboard
app.get('/user-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set up the MongoDB connection.
// mongoose.connect('mongodb://localhost/myapp', { useNewUrlParser: true });


// Define the user and admin schema.
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});


// Define the user and admin models.
const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);


// Set up the Express middleware.
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'mysecretkey', resave: false, saveUninitialized: false }));


// Define the user and admin routes.
// User login
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.redirect('/login');
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (isMatch) {
    req.session.user = user;
    res.redirect('/profile');
  } else {
    res.redirect('/login');
  }
});

// Admin login
app.get('/admin', (req, res) => {
  res.render('admin-login');
});

app.post('/admin', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (!admin) {
    res.redirect('/admin');
  }

  const isMatch = await bcrypt.compare(password, admin.password);

  if (isMatch) {
    req.session.admin = admin;
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/admin');
  }
});

// Add authentication middleware for the user and admin routes.

const requireUserAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const requireAdminAuth = (req, res, next) => {
  if (req.session.admin) {
    next();
  } else {
    res.redirect('/admin')
  }
}

