import { Server } from "socket.io";
import Redis from "ioredis"

const pub = new Redis()
const sub = new Redis()


class SocketManager {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
        
      },
    });
    sub.subscribe("MESSAGES")
  }

  public initListeners() {
    this._io.on("connect", (socket) => {
      console.log("from server : New socket connected ", socket.id);
      socket.on("event:message", ({ message }: { message: string }) => {
        console.log("from server : new msg received ", message);
        pub.publish("MESSAGES",JSON.stringify({message}))
      });
      socket.on('disconnect',()=>{
        console.log("from server : socket disconnected")
      })
      sub.on("message",(channel,message)=>{
        if(channel === "MESSAGES"){
          this.io.emit("message",message)
        }
      })
    });
  }
  get io(){
    return this._io
  }
}

export default SocketManager