import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from '../auth/guards/auth.guard'; 
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from '../chatroom/chat.entity';
import { Comment } from './Entity/comment.entity';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';
import { EditedComment } from './Entity/editedcomment.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Comment,User,Posts,EditedComment]),JwtModule,
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
  controllers: [CommentsController],
  exports:[CommentsService],
  providers: [CommentsService],
})
export class CommentsModule {}