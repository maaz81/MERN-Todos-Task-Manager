const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const todoRoutes = require('./routes/todos')

const app = express();

const whitelist = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "https://your-frontend.onrender.com"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));


app.use(express.json());
app.use('/api/todos', todoRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Start server

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = app;