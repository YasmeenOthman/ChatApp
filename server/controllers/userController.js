const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
require("dotenv").config();

// --------------------- SignUp ------------------------
const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    // Validate user input
    if (!(username && email && password)) {
      return res
        .status(400)
        .send({ msg: "All username,email  and password are required" });
    }
    const oldUsernameCheck = await User.findOne({ username });
    if (oldUsernameCheck)
      return res.json({ msg: "Username already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete newUser.password;
    return res.json({ status: true, newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error,Can not create a new user" });
  }
};

// ------------------- Login --------------------
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send({
        msg: "Both username and password are required ",
      });
    }
    const user = await User.findOne({ username });
    if (user) {
      let isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { userId: user._id, username: user.username },
          process.env.TOKEN_KEY,
          { expiresIn: "2h" }
        );

        res.status(200).json({ msg: "Login successfully", token });
      } else {
        res.status(401).json({ msg: "Wrong Password" });
      }
    } else {
      res.status(400).send({ msg: "User not found,please register first" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ msg: "The server is down, please login again " });
  }
};

module.exports = { registerUser, loginUser };
