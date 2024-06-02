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
    handleFriendRequest(client: Socket, payload: any) {
      this.server.emit('newFriendRequest', payload);
    }
    @SubscribeMessage('newestFriend')
    handleGetFriends(client: Socket, payload: any) {
      this.server.emit('newestFriend', payload);
    }
  }
  