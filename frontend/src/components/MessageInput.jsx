import React, { useContext, useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeBoardSound";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const { playRandomKeyStrokeSound } = useKeyboardSound();

  const {
    backendUrl,
    selectedUser,
    messages,
    setMessages,
    isSoundEnabled,
    getMessagesByUserId,
    user,
  } = useContext(AppContext);

  const [text, setText] = useState("");
  const [imgPreview, setImgPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imgPreview) return;
    if (isSoundEnabled) playRandomKeyStrokeSound();

    const tempId = `temp-${Date.now()}`;

    const optimisticMessage = {
      _id: tempId,
      senderId: user._id,
      receiverId: selectedUser._id,
      text: text.trim(),
      image: imgPreview,
      createdAt: new Date().toISOString(),
      isOptimistic: true, // flag to identify optimistic messages (optional)
    };
    // immidetaly update the ui by adding the message
    setMessages([...messages, optimisticMessage]);

    setText("");
    setImgPreview(null);

    try {
      const res = await axios.post(
        `${backendUrl}/messages/send/${selectedUser._id}`,
        { text: text.trim(), image: imgPreview },
        { withCredentials: true }
      );
      console.log(res?.data?.sentMessage);
      setMessages(() => messages?.concat(res?.data?.sentMessage));
    } catch (error) {
      setMessages(messages);
      console.log(error);
      toast.error(error?.response?.data?.message || "Something went worng");
    }

    setText("");
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImgPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImgPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="px-2 py-2 sm:p-4 sm:border-t border-slate-700/50">
      {imgPreview && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={imgPreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="max-w-3xl mx-0 flex space-x-2 sm:space-x-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
             playRandomKeyStrokeSound();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg  py-2 px-2 sm:px-4 focus:outline-blue-400"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-2 sm:px-4 transition-colors ${
            imgPreview ? "text-cyan-500" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!text.trim() && !imgPreview}
          className="bg-linear-to-r from-cyan-500 to-cyan-600 text-white rounded-lg px-4 py-2 font-medium hover:from-cyan-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
