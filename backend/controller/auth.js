const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(404).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  const token = createToken(user);
  res.json({ token, user: { id: user._id, email: user.email, role: user.role } });
};

exports.addUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const newUser = await User.create({ email, password, role });
    res.status(201).json({ msg: "User created", user: newUser });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
