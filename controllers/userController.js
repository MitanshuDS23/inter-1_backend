const User = require("../models/User");


exports.registerUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password, company, isAgency } =
      req.body;
    const profileImage = req.file?.path || "";

    //  if email already exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      fullName,
      phoneNumber,
      email,
      password,
      company,
      isAgency,
      profileImage,
    });
    await newUser.save();

    res.status(201).json({ message: "User registered", user: newUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // On success
    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
