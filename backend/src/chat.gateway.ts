import { SubscribeMessage,WebSocketGateway,MessageBody,WebSocketServer } from "@nestjs/websockets"

@WebSocketGateway(8001,{cors:'*'})
export class ChatGateway {
    @WebSocketServer()
    server;
    @SubscribeMessage('message')
    handleMessage(@MessageBody() messageData: string):void {
        this.server.emit('message',messageData);
    }
}
