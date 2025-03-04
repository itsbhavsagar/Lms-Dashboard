require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 8080;

const MONGODB_URL = process.env.MONGODB_URL;

cors({
  origin: process.env.LANDING_PAGE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content Type', 'Authorization'],
  //   credentials: true,
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }
};

connectToMongoDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
