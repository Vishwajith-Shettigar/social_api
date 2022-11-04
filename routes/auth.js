const router = require("express").Router();
const bcrypt = require("bcrypt");
// const user = require("../models/user");
const users = require("../models/user");

// Register

router.post("/register", async (req, res) => {
  
  try {
  
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const newUser =  new users({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword

    });
console.log(newUser)
    const useraa = await newUser.save();
 console.log("sdwedew")
    res.status(200).json(useraa);
  } catch (e) {
    console.log(e)
    res.status(500).json(e);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
console.log("helo")
console.log(req.body)

  try {
    const user = await users.findOne({ email: req.body.email });

    !user && res.status(404).json("user not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");
console.log(user)
    res.status(200).json(user);
  } catch (e) {
  res.status(500).json(e)
  }
});

module.exports = router;
