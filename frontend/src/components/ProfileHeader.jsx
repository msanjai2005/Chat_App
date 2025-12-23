import React, { useContext, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { LogOutIcon, Volume2Icon, VolumeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

const ProfileHeader = () => {
  const { backendUrl, user,setUser, checkAuth, disconnectSocket } = useContext(AppContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(
    JSON.parse(localStorage.getItem("isSoundEnabled")) === true
  );

  const fileInputRef = useRef(null);

  const handleImgUpload = (e) => {
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async()=>{
      const base64Img = reader.result
      setSelectedImg(base64Img);
      await ImageUploadBackend({picture:base64Img});
    }

  };

  const ImageUploadBackend = async (data) => {
    const toastId = toast.loading("Uploading profile image...");

    try {
      const res = await axios.put(
        `${backendUrl}/auth/update`,
        data,
        { withCredentials: true }
      );

      setUser(res?.data?.user);

      toast.success("Profile updated successfully", {
        id: toastId,
      });

    } catch (error) {
      console.log("Error while uploading Image:", error);

      toast.error("Failed to upload image", {
        id: toastId,
      });

      setSelectedImg(null);
    }
  };

  const toggleSound = () => {
    localStorage.setItem("isSoundEnabled", !isSoundEnabled);
    setIsSoundEnabled(!isSoundEnabled);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      disconnectSocket()
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error?.responce?.data);
    } finally {
      checkAuth();
    }
  };

  const handleIsSoundEnabled = () => {
    // play click sound
    mouseClickSound.currentTime = 0;
    mouseClickSound
      .play()
      .catch((error) => console.log("error in play sound :", error));
    setTimeout(()=>toggleSound(),100);
  };

  return (
    <div className="p-6  border-slate-700/50 ">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="relative size-14 rounded-full cursor-pointer">
            <div className=" absolute size-2.5 bg-green-500 right-1 top-0.5 rounded-full z-10 border-2 border-white "></div>
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer "
              onClick={() => fileInputRef.current.click()}
            >
              <img
                src={ user?.picture || "/avatar.png"}
                alt="user image"
                className=" size-full object-cover"
              />
              <div className=" absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImgUpload}
              className="cursor-pointer hidden"
            />
          </div>
          {/* USER NAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-45 truncate">
              {user?.name}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>
        {/* BUTTONS */}
        <div className="flex gap-4 items-center">
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            <LogOutIcon className="size-5" />
          </button>
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
            onClick={handleIsSoundEnabled}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOff className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
