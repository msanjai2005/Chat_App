import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";
import {User} from "../models/user.model.js";
import { getRandomValues } from "crypto";
import { getReceiverSocketId, io } from "../config/socket.js";

export const getAllContects = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res.json({ success: true, contacts: filteredUser });
  } catch (error) {
    console.log("error in get All contects :", error.message);
    return res.json({ success: true, message: error.message });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === myId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    return res.json({ success: true, chatPartners });
  } catch (error) {
    console.log("Error in getChatPartners:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const toId = req.params.id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: toId },
        { senderId: toId, receiverId: myId },
      ],
    });

    res.json({ success: true, messages });
  } catch (error) {
    console.log("error in get messages :", error.message);
    return res.json({ success: false, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if(!text && !image){
      return res.status(400).json({success:false, message:"Please enter any messages"});
    }
    if(senderId.equals(receiverId)){
      return res.status(400).json({success:false, message:"You can't send message your self."});
    }
    const receiver = await User.findById(receiverId);
    if(!receiver){
      return res.status(404).json({success:false, message:"User Not found"});
    }

    let imageURL;
    if (image) {
      const uploadResponce = await cloudinary.uploader.upload(image);
      imageURL = uploadResponce.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageURL,
    });
    await newMessage.save();

    //todo : send message in real time if user is Online - socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
    }

    return res.status(201).json({ success: true, sentMessage: newMessage });
  } catch (error) {
    console.log("error in get send message");
    return res.json({ success: true, message: error.message });
  }
};
