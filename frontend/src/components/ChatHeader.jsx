import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser,onlineUsers } = useContext(AppContext);

   useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") setSelectedUser(null);
    };

    window.addEventListener("keydown", handleEscKey);

    // cleanup function
    return () => window.removeEventListener("keydown", handleEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-21 px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <div className="size-12 rounded-full overflow-hidden">
              <img
                src={selectedUser?.picture || "/avatar.png"}
                alt={selectedUser?.name}
                className="w-full h-full object-cover"
              />
            </div>
            {onlineUsers.includes(selectedUser._id) && <div className="absolute top-0 right-0 size-3 bg-green-500 rounded-full border-2 border-gray-900"></div>}
          </div>

          {/* Name */}
          <div>
            <h4 className="text-white font-medium truncate">
              {selectedUser?.name}
            </h4>
            <p className="text-slate-400 text-xs">{onlineUsers.includes(selectedUser._id) ?"Online":"Offline"}</p>
          </div>
        </div>
      </div>
      <button onClick={() => setSelectedUser(null)}>
        <XIcon className="w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
};

export default ChatHeader;
