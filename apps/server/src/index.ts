import http from "http"
import SocketManager from "./sevices/SocketManager"
const server = http.createServer()
const socketService = new SocketManager()

const PORT = process.env.PORT || 8000

socketService.io.attach(server)
server.listen(PORT,()=>{
  console.log(`server running on ${PORT}`)
  socketService.initListeners()
})