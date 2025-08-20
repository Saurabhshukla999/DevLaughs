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
    ? ['https://shareboard-db6d.onrender.com'] 
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

const postSchema = new mongoose.Schema({
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

// Get all posts
app.get("/", async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { author, content } = req.body;
    
    if (!content || !author) {
      return res.status(400).json({ error: "Both content and author are required" });
    }
    
    const newPost = new Post({ content, author });
    const savedPost = await newPost.save();
    
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// API info endpoint
app.get("/api", (req, res) => {
  res.json({
    message: "ShareBoard API is running!",
    version: "1.0.0",
    endpoints: {
      "GET /": "Get all posts",
      "POST /posts": "Create a new post",
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