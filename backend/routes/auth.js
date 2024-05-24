const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../modals/user");

// SIGN UP
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = new User({ email, username, password: hashpassword });
    await newUser.save();

    res.status(200).json({ message: "Sign Up Successful" });
  } catch (error) {
    console.error("Error in user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .json({ message: "You're not registered. Please register first" });
    }
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(200)
        .json({ message: "Wrong Password. Please enter the correct password" });
    }
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error("Error in user sign-in:", error);
    res.status(200).json({ message: "Internal server error" });
  }
});

module.exports = router;
