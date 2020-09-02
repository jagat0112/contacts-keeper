const express = require("express");
const router = express.Router();
const User = require("../models/login");

// Post Username
router.post("/", async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET Users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
