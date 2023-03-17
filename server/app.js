// Install the necessary packages
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const cookieSession = require('cookie-session');

const User = require('./module/auth/user');

require('./passport');

require('./config/connectDB');

// Set up Express app
const app = express();

app.use(
  cors({
    // origin: '*',
    origin: ['http://localhost:3000', 'http://localhost:4000'],
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'DELETE', 'OPTIONS', 'PATCH'],
  })
);

app.use(cors());
app.use(express.json({}));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const AuthenticationRouter = require('./module/auth/route');
const itemRoutes = require('./module/item/route');
const adminRoutes = require('./module/admin/route');
const roomRoutes = require('./module/room/route');
const bookRoutes = require('./module/borrow/route');

const errorHandler = require('./middleware/errorHandler');

// Serve static routes
const path = require('path');
const IMAGE_PATH = path.resolve('.', 'public', 'images');
app.use('/uploads', express.static(IMAGE_PATH));

// Set up authentication routes
app.use(AuthenticationRouter);
app.use('/api/items', itemRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/booking', bookRoutes);

app.use(errorHandler);

module.exports = app;
