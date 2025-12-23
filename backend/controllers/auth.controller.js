import { User } from "../models/user.model.js";
import { getTokenAndSetcookies } from "../utils/getTokenAndSetcookies.js";
import { comparePassword, hashedPassword } from "../utils/passwordFN.js";
import 'dotenv/config';
import cloudinary from '../config/cloudinary.js';

export const register = async (req, res) => {
  const { Name, email, password } = req.body;

  if (!Name || !email || !password) {
    console.log("Name :",Name);
    console.log("email :",email);
    console.log("password :",password);
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format",
    });
  }
  try {
    const Existuser = await User.findOne({ email });
    if (Existuser) {
      return res
        .status(400)
        .json({ success: false, message: "User already Exists" });
    }
    
    const hashPassword = await hashedPassword(password);

    const user = new User({
      name: Name,
      email,
      password: hashPassword,
    });
    await user.save();
    await getTokenAndSetcookies(res, user._id);

    // await sendWelcomeEmail(user.email,user.name,process.env.FRONTEND_URL);

    console.log(`User successfilly created ${user}`);
    return res.status(201).json({
      success: true,
      message: "Registered Successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in Register",error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All inputs are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found. you must register" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Cridentials" });
    }
    await getTokenAndSetcookies(res, user._id);

    user.lastLogin = Date.now();
    await user.save();

    console.log("successfully logged in");
    return res.status(200).json({
      success: true,
      user: {
        ...user._doc,
        password: undefined,
      },
      message: "successfully logged in",
    });
  } catch (error) {
    console.log("error in login");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
    });
    console.log("Successfully logged out");
    res.status(200).json({ success: true, message: "Logout successfully" });
  } catch (error) {
    console.log("error in logout");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkIsAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in is auth");
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async(req,res)=>{
  try {
    const { picture } = req.body;
    if(!picture) return res.status(404).json({success:false, message:"profile picture is required."});

    const userId = req.user._id;

    const uploadResponce = await cloudinary.uploader.upload(picture);

    const updatedUser = await User.findByIdAndUpdate(userId,{picture:uploadResponce.secure_url},{new:true});

    res.status(200).json({success:true,user:updatedUser});

  } catch (error) {
    console.log("Error in update profile : ",error.message);
    return res.status(500).json({success:false, message:error.message});
  }
}