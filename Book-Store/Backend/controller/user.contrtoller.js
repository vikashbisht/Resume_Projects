import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    await createdUser.save();
    res.status(201).json({ message: "User created successfully", user:{
      _id: createdUser.id,
      fullname: createdUser.fullname,
      email: createdUser.email,
    } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, existingUser.password);
    if (!existingUser || !isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res
      .status(200)
      .json({
        message: "User signed in successfully",
        user: {
          _id: existingUser.id,
          fullname: existingUser.fullname,
          email: existingUser.email,
        },
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
