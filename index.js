const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { createDbConnection } = require("./db");
const UserModel = require("./model/user.model");
const BlogModel = require("./model/blog.model");
const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://0.0.0.0:10000",
      "https://mern-blog-ui.netlify.app/"
    ],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());

// Middleware to verify JWT token
const verifyJwt = (req, res, next) => {
  const token = req.cookies.token; // JWT token is stored in cookies

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || "default_secret_key"
    );
    req.user = decoded; // Add decoded user data to request object
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// API Route for creating a user
app.post("/auth/signup", async (req, res) => {
  console.log(req.body);
  try {
    const user = new UserModel(req.body);
    const result = await user.save();
    res.json({ status: "Success", user: result });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({ status: "ERROR", message: err.message });
  }
});

// API Route for user login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "ERROR", message: "No record exists" });
    }

    // Compare plain text password ( Not Secure)
    if (password !== user.password || email!==user.email) {
      return res.status(401).json({ status: "ERROR", message: "Incorrect email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id, username:user.username }, 
      process.env.JWT_SECRET_KEY || "default_secret_key",
      { expiresIn: "1d" }
    );

    // Set JWT in HttpOnly cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.json({
      status: "Success",
      message: "Login successful",
      user: { email: user.email, userid: user._id, username:user.username },
     });

  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ status: "ERROR", message: "Internal server error" });
  }
});

// create blogs
app.post("/post/blogs", async (req, res) => {
  try {
    const blog = new BlogModel(req.body);
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: "Failed to create blog", error: err });
  }
});

// get all blogs
app.get("/get/blogs", async (req, res) => {
  try {
    const blogs = await BlogModel.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs." });
  }
});

// get all blogs - specific user
app.get("/get/user/blogs", (req, res) => {
  const { email } = req.query; // Get email from query parameters
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  BlogModel
    .find({ email })
    .then((BlogModel) => {
      res.json(BlogModel); 
    })
    .catch((err) => {
      console.error("Error fetching blogs:", err);
      res.status(500).json({ message: "Error fetching blogs", error: err });
    });
});

// Update blog by ID
app.put("/put/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image, category, author } = req.body;

    const updatedBlog = await BlogModel.findByIdAndUpdate(
      id,
      { title, content, image, category, author },
      { new: true } // returns updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json(updatedBlog);
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete blog by ID
app.delete("/delete/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await BlogModel.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET /blogs?category=:category&author=:author
app.get('/blogs', async (req, res) => {
  const { search } = req.query;

  let filter = {};
  if (search) {
    // Case-insensitive search in category or author
    filter = {
      $or: [
        { category: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ]
    };
  }

  try {
    const blogs = await BlogModel.find(filter);
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});



// Starting the server
app.listen(process.env.PORT, process.env.HOSTNAME, function () {
  createDbConnection();
  console.log("connected")
});