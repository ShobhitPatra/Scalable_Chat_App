import { Server as WebSocketServer } from "ws";
import { Server as HttpServer } from "http";
class SocketManager {
  private _io: WebSocketServer;
  constructor(httpServer: HttpServer) {
    this._io = new WebSocketServer({server  :httpServer});
    console.log("socket server initialized");
  }
  public initListeners(){
    const io  = this._io
    io.on('connection',(socket)=>{
        console.log(`new socket connected : ${socket}`)
        
        socket.on("message",(data  : {data :string})=>{
            console.log(`new message received : ${data}`)
        })
    })

  }
}

export default SocketManager;
