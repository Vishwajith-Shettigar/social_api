const router = require("express").Router();
const bcrypt = require("bcrypt");
const user = require("../models/user");
const users = require("../models/user");

// Register

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = await new users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await users.findOne({ username: req.body.username });

    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (e) {
  res.status(500).json(e)
  }
});

module.exports = router;
