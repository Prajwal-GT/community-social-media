const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Post = require("./models/Post");
const User = require("./models/User");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/community")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Error:");
    console.error(err);
  });

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

const escapeForRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  const normalizedUsername = (username || "").trim();
  const normalizedEmail = (email || "").trim().toLowerCase();

  if (!normalizedUsername || !normalizedEmail || !password) {
    return res.status(400).json({ message: "Please provide a username, email, and password." });
  }

  const existingUser = await User.findOne({
    $or: [
      { email: normalizedEmail },
      { username: new RegExp(`^${escapeForRegex(normalizedUsername)}$`, "i") },
    ],
  });

  if (existingUser) {
    return res.status(400).json({ message: "An account with that email or username already exists." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username: normalizedUsername,
    email: normalizedEmail,
    password: hashedPassword,
  });

  await user.save();

  res.json({
    message: "User Registered Successfully",
  });
});

app.post("/login", async (req, res) => {
  const { email, password, username } = req.body;
  const identifier = (email || username || "").trim().toLowerCase();

  if (!identifier || !password) {
    return res.status(400).json({ message: "Please provide your email or username and password." });
  }

  const user = await User.findOne({
    $or: [
      { email: identifier },
      { username: new RegExp(`^${escapeForRegex(identifier)}$`, "i") },
    ],
  });

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    "mysecretkey",
    {
      expiresIn: "7d",
    }
  );

  res.json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

app.post("/posts", async (req, res) => {
  const post = new Post({
    ...req.body,
    likes: 0,
    dislikes: 0,
  });

  await post.save();
  res.json(post);
});

app.put("/posts/:id/like", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.likes += 1;
  await post.save();

  res.json(post);
});

app.put("/posts/:id/dislike", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.dislikes += 1;
  await post.save();

  res.json(post);
});

app.post("/posts/:id/comment", async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.comments.push({
    username: req.body.username,
    text: req.body.text,
    parentId: req.body.parentId || null,
  });

  await post.save();

  res.json(post);
});

app.delete("/posts/:id", async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post deleted" });
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

app.put("/users/:id", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
