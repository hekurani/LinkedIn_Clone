import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from '../auth/guards/auth.guard'; 
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../chatroom/chat.entity';
import { Message } from './Entity/message.entity';
import { User } from '../users/user.entity';
import { DeletedMessage } from './Entity/deletedmessage.entity';
import { EditedMessage } from './Entity/editedmessage.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Message,ChatRoom,User,DeletedMessage,EditedMessage]),JwtModule,
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
  controllers: [MessageController],
  exports:[MessageService],
  providers: [MessageService],
})
export class MessageModule {}