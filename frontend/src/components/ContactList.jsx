import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import UsersLoadingSkeleton from "./UsersLoadingSkeleton";
import toast from "react-hot-toast";
import axios from "axios";
import NoChatsFound from "./NoChatsFound";

const ContactList = () => {
  const {
    backendUrl,
    isUsersLoading,
    setIsUsersLoading,
    setSelectedUser,
    isCheckingAuth,
    isAuthenticated,
    allContacts,
    setAllContects,
    onlineUsers
  } = useContext(AppContext);

  const getContacts = async () => {
    setIsUsersLoading(true);
    try {
      const res = await axios.get(`${backendUrl}/messages/contacts`, {
        withCredentials: true,
      });
      setAllContects(res.data.contacts);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    setIsUsersLoading(false);
  };

  useEffect(() => {
    if (!isCheckingAuth && isAuthenticated) {
      getContacts();
    }
  }, []);

  if (isUsersLoading) return <UsersLoadingSkeleton />;
  if (allContacts.length === 0) return <NoChatsFound />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="px-3 py-4 rounded-lg hover:bg-cyan-500/20 cursor-pointer transitionbg-cyan-500/10-colors bg-cyan-500/10 "
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="relative">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={contact.picture || "/avatar.png"}
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {onlineUsers.includes(contact._id) && <div className="absolute top-0 right-0 size-3 bg-green-500 rounded-full border-2 border-gray-900"></div>}
            </div>

            {/* Name */}
            <h4 className="text-white font-medium truncate">{contact.name}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
