import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = "http://localhost:3000/api";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [allContacts, setAllContects] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessageLoading, setIsMessageLoading] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/is-auth`, {
        withCredentials: true,
      });

      if (res.data.success && res.data.user) {
        setUser(res.data.user);
        connectSocket();
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("Auth check failed:", error?.response?.data?.message);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsCheckingAuth(false);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const getMessagesByUserId = async (userId) => {
    setIsMessageLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/messages/${userId}`, {
        withCredentials: true,
      });
      setMessages(res.data.messages);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsMessageLoading(false);
    }
  };

  const connectSocket = () => {
    if (!user || socket?.connected) return;

    const newSocket = io("http://localhost:3000", {
      withCredentials: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (err) => {
      console.log("❌ Socket error:", err.message);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (user) connectSocket();
    return () => {
      socket?.disconnect();
      setSocket(null);
    };
  }, [user]);

  const disconnectSocket = () => {
    if (socket?.connected) {
      socket.disconnect();
      setSocket(null);
    }
  };

  const subscribeToMessages = (chatUserId) => {
    if (!socket || !chatUserId) return;

    const handler = (newMessage) => {
      if (newMessage.senderId !== chatUserId) return;

      setMessages((prev) => [...prev, newMessage]);

      if (isSoundEnabled) {
        const sound = new Audio("/sounds/notification.mp3");
        sound.currentTime = 0;
        sound.play().catch(() => {});
      }
    };

    socket.on("newMessage", handler);

    return () => {
      socket.off("newMessage", handler);
    };
  };

  const value = {
    backendUrl,
    checkAuth,
    user,
    setUser,
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    setIsLoading,
    isCheckingAuth,
    setIsCheckingAuth,

    connectSocket,
    disconnectSocket,
    onlineUsers,
    subscribeToMessages,

    allContacts,
    setAllContects,
    chats,
    setChats,
    messages,
    setMessages,
    activeTab,
    setActiveTab,
    selectedUser,
    setSelectedUser,
    isUsersLoading,
    setIsUsersLoading,
    isMessageLoading,
    setIsMessageLoading,
    getMessagesByUserId,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
