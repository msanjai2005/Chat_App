import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'

const ActiveTabSwitch = () => {

  const {activeTab, setActiveTab} = useContext(AppContext);

  return (
    <div className='w-full h-13 p-3 flex justify-around items-center transition'>
      <button onClick={()=>setActiveTab("chats")} className={`w-full py-1 rounded  cursor-pointer ${activeTab === "chats"? "bg-cyan-500/50 ":"text-slate-400 hover:text-slate-300"}`}>Chats</button>
      <button onClick={()=>setActiveTab("contacts")} className={`w-full py-1 rounded cursor-pointer ${activeTab === "contacts"? "bg-cyan-500/50 ":"text-slate-400 hover:text-slate-300"}`}>Contacts</button>
    </div>
  )
}

export default ActiveTabSwitch
