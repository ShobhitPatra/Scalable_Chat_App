"use client"
import React, { useEffect, useState } from "react";

interface SocketContextProviderProps {
  children: React.ReactNode;
}
const SocketContext = React.createContext<WebSocket|null>(null);

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket,setSocket]  = useState<WebSocket|null>(null)

  useEffect(()=>{
    const newSocket = new WebSocket("")
    if(newSocket){
      setSocket(newSocket)
    }

    return ()=>{
      newSocket.close()
    }
  },[])
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
