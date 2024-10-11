// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// interface SocketContextProviderProps {
//   children: React.ReactNode;
// }

// interface SocketContextValues {
//   socket: Socket | null;
//   messages: String[];
// }
// const SocketContext = React.createContext<SocketContextValues | null>(null);

// export const SocketContextProvider: React.FC<SocketContextProviderProps> = ({
//   children,
// }) => {
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [messages, setMessages] = useState<String[]>([]);

//   useEffect(() => {
//     const _io = io("http://localhost:8000");
//     if (_io) {
//       setSocket(_io);
//       console.log("socket connected on client");
//     }

//     _io.on("message", (message) => {
//       console.log("from client : new msg received : ", JSON.parse(message));
//       setMessages((prev)=>[...prev,message])
//     });

//     return () => {
//       _io.disconnect();
//     };
//   }, []);
//   return (
//     <SocketContext.Provider value={{ socket, messages }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => {
//   return useContext(SocketContext);
// };

"use client";
import React, { useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    const _io = io("http://localhost:8000", {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    _io.on("connect", () => {
      console.log("Socket connected on client, ID:", _io.id);
      setSocket(_io);
    });

    _io.on("event:message", (message: Message) => {
      console.log("Client received message:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    _io.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    _io.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      _io.disconnect();
    };
  }, []);

  // Debug: Log messages when they change
  useEffect(() => {
    console.log("Messages updated:", messages);
  }, [messages]);

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