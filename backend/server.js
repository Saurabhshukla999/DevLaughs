// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://devlaughs.onrender.com'] // Your actual Render frontend URL
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    port: process.env.PORT || 5000,
    environment: process.env.NODE_ENV || 'development'
  });
});

const jokeSchema = new mongoose.Schema({
  joke: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const Joke = mongoose.model("Joke", jokeSchema);

// Get all jokes
app.get("/", async (req, res) => {
  try {
    const jokes = await Joke.find({}).sort({ createdAt: -1 });
    res.json(jokes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jokes" });
  }
});

// Post a new joke
app.post("/jokes", async (req, res) => {
  try {
    const { author, joke } = req.body;
    
    if (!joke || !author) {
      return res.status(400).json({ error: "Both joke and author are required" });
    }
    
    const newJoke = new Joke({ joke, author });
    const savedJoke = await newJoke.save();
    
    res.status(201).json(savedJoke);
  } catch (error) {
    res.status(500).json({ error: "Failed to create joke" });
  }
});

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "Jokefy API is running!",
    version: "1.0.0",
    endpoints: {
      "GET /": "Get all jokes",
      "POST /jokes": "Create a new joke",
      "GET /health": "Health check",
      "GET /api": "API information"
    },
    timestamp: new Date().toISOString()
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📡 MongoDB: ${process.env.MONGO_URI ? 'Connected' : 'Not configured'}`);
});