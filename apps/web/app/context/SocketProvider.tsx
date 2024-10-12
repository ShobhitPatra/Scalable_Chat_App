"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextProviderProps {
  children: React.ReactNode;
}

interface Message {
  message: string;
  timestamp: number;
}

interface SocketContextValues {
  socket: Socket | null;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

const SocketContext = React.createContext<SocketContextValues | null>(null);

export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const onMsgRec = useCallback((msg: string) => {
    console.log("msg rec on client  :", msg);
    const { message } = JSON.parse(msg);
    setMessages((prev) => [...prev, message]);
  }, []);
  useEffect(() => {
    const _io = io("http://localhost:8000");

    _io.on("connect", () => {
      console.log("Socket connected on client, ID:", _io.id);
      setSocket(_io);
    });

    _io.on("message", onMsgRec);

    _io.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      _io.off("message", onMsgRec);
      _io.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, messages, setMessages }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketContextProvider");
  }
  return context;
};
