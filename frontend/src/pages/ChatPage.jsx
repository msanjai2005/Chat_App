import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import BorderAnimated from "../components/BorderAnimated";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversation from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useContext(AppContext);

  return (
    <div className="relative w-full max-w-6xl h-screen sm:h-[90vh] mx-auto">
      <BorderAnimated>
        <div className="flex w-full h-full overflow-hidden">
          {/* LEFT PANEL (Chats / Contacts) */}
          <div
            className={`
              w-full sm:w-80
              bg-slate-800/50 backdrop-blur-sm
              flex flex-col
              ${selectedUser ? "hidden sm:flex" : "flex"}
            `}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 p-4 space-y-2 overflow-y-auto scrollbar-hide">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT PANEL (Chat Window) */}
          <div
            className={`
              flex-1 flex flex-col
              bg-slate-900/50 backdrop-blur-sm
              ${!selectedUser ? "hidden sm:flex" : "flex"}
            `}
          >
            {selectedUser ? <ChatContainer /> : <NoConversation />}
          </div>
        </div>
      </BorderAnimated>
    </div>
  );
};

export default ChatPage;
