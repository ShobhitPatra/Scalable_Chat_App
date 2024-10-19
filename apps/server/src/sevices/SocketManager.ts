import { Server } from "socket.io";
import Redis from "ioredis"
import prisma from "./db";
import { produceMessage } from "./kafka";


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
      socket.on("event:message", (message) => {
        console.log("from server : new msg received ", message);
        pub.publish("MESSAGES",JSON.stringify({message}))
      });
      socket.on('disconnect',()=>{
        console.log("from server : socket disconnected")
      })
      sub.on("message",async(channel,message)=>{
        if(channel === "MESSAGES"){
          this.io.emit("message",{message}  )
          await produceMessage(message)
        }
      })
    });
  }
  get io(){
    return this._io
  }
}

export default SocketManager