import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:true
    },
    username: {
      type: String,
      unique: true,
      required:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    picture: {
      type: String,
      default:""
    },
    googleId: {
      type: String
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    }
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
