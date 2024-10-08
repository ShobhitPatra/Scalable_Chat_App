"use client"
import React, { useContext, useEffect, useState } from "react";

interface SocketContextProviderProps {
  children: React.ReactNode;
}

interface SocketContextValues{
  socket : WebSocket | null;
  messages : Object[] 
}
const SocketContext = React.createContext<SocketContextValues |null>(null);

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket,setSocket]  = useState<WebSocket |null>(null)
  const [messages,setMessages]  =useState<Object[]>([])

  useEffect(()=>{
    const ws = new WebSocket("")

      
      ws.onopen=()=>{
        console.log("socket connected")

      }
      ws.onmessage=(message)=>{
        const newMessage = JSON.parse(message.data)
        console.log(`message received : ${newMessage}`)
        setMessages((prevMessages)=>[...prevMessages,newMessage])
      }
    
      setSocket(ws)
    return ()=>{
      ws.close()
    }
  },[])
  return (
    <SocketContext.Provider value={{socket,messages}}>{children}</SocketContext.Provider>
  );
};

export const useWebSocket = ()=>{
  return useContext(SocketContext)
}