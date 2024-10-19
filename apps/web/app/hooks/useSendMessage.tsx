    
import { useCallback } from "react";
import { useSocket } from "../context/SocketProvider";

interface Message{
  data : string,
 
  
}
const useSendMessage = () => {
  const { messages, socket } = useSocket() || { messages: [], socket: null };

  const sendMessage = useCallback((data: string) => {
    if (socket) {
     
      const newMessage: Message = {
        data
       
       
      };
      
      socket.emit("event:message", newMessage);
      
      
      // Don't add the message to the state here, it will be added when received from the server
      // This ensures consistency across all clients
      
      console.log("Message sent:", newMessage);
    } else {
      console.error("Socket not available");
    }
  }, [socket]);
  return sendMessage
};

export default useSendMessage;
