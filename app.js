const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const corsOptions = require('./config/cors');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const shopRoutes = require('./routes/shopRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());  // This is the crucial line for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));  // For URL-encoded bodies

app.use('/api/auth', authRoutes);
app.use('/api/shops', shopRoutes);

// app.use(errorHandler);

module.exports = app;