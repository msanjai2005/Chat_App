import { User } from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../config/cloudinary.js";

export const getAllContects = async (req, res) => {
  try {
    const userId = req.user._id;
    const filteredUser = await User.find({ _id: { $ne: userId } }).select(
      "-password"
    );
    return res.json({ success: true, contects: filteredUser });
  } catch (error) {
    console.log("error in get All contects");
    return res.json({ success: true, message: error.message });
  }
};

export const getAllChats = async (req, res) => {};

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
    res.json({success:true,messages});
  } catch (error) {
    console.log("error in get messages");
    return res.json({ success: true, message: error.message });
  }
};

export const sendMessage = async (req, res) => {
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageURL;
        if(image){
            const uploadResponce = await cloudinary.uploader.upload(image);
            imageURL = uploadResponce.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        })
        await newMessage.save();

        // send message in real time if user is Online - socket.io

        

        return res.status(200).json({success:true, sentMessage:newMessage});

    } catch (error) {
        console.log("error in get send message");
        return res.json({ success: true, message: error.message });
    }
};
