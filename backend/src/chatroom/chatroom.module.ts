import { Module } from '@nestjs/common';
import { ChatroomController } from './chatroom.controller';
import { ChatRoomService } from './chatroom.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from '../auth/guards/auth.guard'; 
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../chatroom/chat.entity';
import { Message } from '../message/message.entity';
import { UsersModule } from 'src/users/users.module';
import { User } from 'src/users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Message,ChatRoom,User]),JwtModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], 
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '600s' },
      }),
    }),
  ],
  controllers: [ChatroomController],
  exports:[ChatRoomService],
  providers: [ChatRoomService],
})
export class ChatRoomModule {}