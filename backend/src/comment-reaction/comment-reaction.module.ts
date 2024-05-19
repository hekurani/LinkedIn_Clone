import { Module } from '@nestjs/common';
import { CommentReactionController } from './comment-reaction.controller';
import { CommentReactionService } from './comment-reaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { commentreaction } from './comment-reaction.entity';
import { JwtModule } from '@nestjs/jwt';
import { CommentsModule } from 'src/comments/comments.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([commentreaction]),JwtModule,
    ConfigModule,UsersModule,CommentsModule,
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
  controllers: [CommentReactionController],
  providers: [CommentReactionService]
})
export class CommentReactionModule {}
