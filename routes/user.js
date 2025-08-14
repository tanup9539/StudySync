const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Use the model from models/User.js

router.post('/', async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email required' });
  }

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(200).json({ message: "User saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

module.exports = router;
