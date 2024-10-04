import http from "http";
import SocketManager from "./sevices/SocketManager";
const server = http.createServer();
const socket = new SocketManager(server)
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`sever running at PORT ${PORT}`);
});
socket.initListeners()