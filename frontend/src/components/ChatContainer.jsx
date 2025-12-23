import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import ChatHeader from "./ChatHeader";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder ";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  const {
    user,
    getMessagesByUserId,
    isMessageLoading,
    messages,
    selectedUser,
    subscribeToMessages,
  } = useContext(AppContext);

  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!selectedUser?._id) return;

    getMessagesByUserId(selectedUser._id);

    const unsubscribe = subscribeToMessages(selectedUser._id);

    return () => unsubscribe?.();
  }, [selectedUser?._id]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-5 sm:px-10 overflow-y-auto py-5 scrollbar-hide scrollbar-hide">
        {isMessageLoading ? (
          <MessagesLoadingSkeleton />
        ) : messages && messages.length > 0 ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => {
              const isMe = msg?.senderId === user?._id;

              return (
                <div
                  key={msg?._id}
                  className={`flex ${
                    isMe ? "justify-end" : "justify-start"
                  } mb-2`}
                >
                  <div
                    className={`relative max-w-[75%] rounded-2xl px-4 py-2 text-sm
            ${
              isMe
                ? "bg-cyan-600 text-white rounded-br-none"
                : "bg-slate-800 text-slate-200 rounded-bl-none"
            }`}
                  >
                    {msg?.image && (
                      <img
                        src={msg.image}
                        alt="Shared"
                        className="mb-2 rounded-lg h-48 w-full object-cover"
                      />
                    )}

                    {msg?.text && <p>{msg.text}</p>}

                    <p className="mt-1 text-[10px] opacity-70 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}

            <div ref={messageEndRef} />
          </div>
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.name} />
        )}
      </div>
      <MessageInput />
    </>
  );
};

export default ChatContainer;
