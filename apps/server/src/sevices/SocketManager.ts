import { Server } from "socket.io";

class SocketManager {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
        
      },
    });
  }

  public initListeners() {
    this._io.on("connect", (socket) => {
      console.log("from server : New socket connected ", socket.id);
      socket.on("event:message", ({ message }: { message: string }) => {
        console.log("from server : new msg received ", message);
        socket.emit("event:message",message)
      });
      socket.on('disconnect',()=>{
        console.log("from server : socket disconnected")
      })
    });
  }
  get io(){
    return this._io
  }
}

export default SocketManager