const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const corsOptions = require('./config/cors');

dotenv.config();
connectDB();

const app = express();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

module.exports = app;