const router = require("express").Router();
const bcrypt = require("bcrypt"); // Import bcrypt library
const User = require("../modals/user");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const hashpassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const newUser = new User({ email, username, password: hashpassword });
    await newUser.save();

    res.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res
        .status(400)
        .json({ message: "You're not registerd please register first" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      res
        .status(400)
        .json({ message: "Wrong Password!!! Please enter correct password " });
    }
const { passsword, ...others } = user._doc;
res.status(200).json(others);
  } catch (error) {
    res.status(400).json({ message: "Internal server error" });
  }
});

module.exports = router;
