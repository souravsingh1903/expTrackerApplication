// routes/userRoutes.js

const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/databaseModel"); // Adjust the path based on your project structure

const router = express.Router();

router.post("/user/sign-up", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 10, async (err, hash) => {
      await User
        .create({
          name: name,
          email: email,
          password: hash,
        })
        .then((result) => {
          console.log("User Added");
          res.status(201).json(result);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }catch (err) {
    console.error("Error in User route:", err);
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});

router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email: username } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Password matches - User login successful
      return res.json({ message: "User login successful" });
    } else {
      // Password doesn't match - User not authorized
      return res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    console.error("Error in User route:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

module.exports = router;
