
import { useWebSocket } from "../context/SocketProvider";

const useSendMessage = () => {
  const { messages, socket } = useWebSocket() || { messages: [], socket: null };

  const sendMessage = (data: string) => {
    if (socket) {
      socket?.send(JSON.stringify(data));
    } else {
      console.log("socket not available");
    }
  };
  return sendMessage
};

export default useSendMessage;
