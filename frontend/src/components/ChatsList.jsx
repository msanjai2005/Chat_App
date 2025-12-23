import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import toast from "react-hot-toast";
import axios from "axios";
import NoChatsFound from "./NoChatsFound";

const ChatsList = () => {
  const {
    backendUrl,
    chats,
    setChats,
    isUsersLoading,
    setIsUsersLoading,
    setSelectedUser,
    isCheckingAuth,
    isAuthenticated,
    onlineUsers
  } = useContext(AppContext);

  const getMyChatPartners = async () => {
    setIsUsersLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/messages/chats`, {
        withCredentials: true,
      });
      setChats(res.data.chatPartners);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
    setIsUsersLoading(false);
  };

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      getMyChatPartners();
    }
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (chats.length === 0) return <NoChatsFound />;

  return (
    <>
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="p-3 rounded-lg hover:bg-cyan-500/20 cursor-pointer transitionbg-cyan-500/10-colors bg-cyan-500/10"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative ">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={chat.picture || "/avatar.png"}
                  alt={chat.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {onlineUsers.includes(chat._id) && <div className="absolute top-0 right-0 size-3 bg-green-500 rounded-full border-2 border-gray-900"></div>}
            </div>

            {/* Name */}
            <h4 className="text-white font-medium truncate">{chat.name}</h4>
            
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatsList;
