 import { OnGatewayConnection,OnGatewayDisconnect,SubscribeMessage,WebSocketGateway,WebSocketServer } from "@nestjs/websockets";
import { Server,Socket } from "socket.io";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server:Server

 
    @SubscribeMessage('message')
    handleMessage(socket:Socket,message:string){
        console.log("Hinemmmm")
        this.server.emit('message',message)
    }

} 