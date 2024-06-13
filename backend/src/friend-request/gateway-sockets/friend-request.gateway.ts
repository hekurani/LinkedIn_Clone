import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  @WebSocketGateway(8002,{ cors: true })
  export class FriendRequestGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
  {
    @WebSocketServer() server: Server;
  
  
    afterInit(server: Server) {
      console.log('WebSocket server initialized');
    }
  
    handleConnection(client: Socket, ...args: any[]) {
      console.log(`Client connected: ${client.id}`);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Client disconnected: ${client.id}`);
    }
  
    @SubscribeMessage('friendRequest')
    async handleFriendRequest(client: Socket, payload: { userId: number; friendId: number }) {
      this.server.to(payload.friendId.toString()).emit('newFriendRequest', payload);
    }

  }
  