import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Posts } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { SkillsModule } from './skills/skills.module';
import { dataSourceOptions } from './db/config/dataSource';
import { Skill } from './skills/skills.entity';
import { ChatRoomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { ChatRoom } from './chatroom/chat.entity';
import { Message } from './message/message.entity';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendsModule } from './friends/friends.module';
import { CommentsModule } from './comments/comments.module';
import { FriendRequestService } from './friend-request/friend-request.service';
import { FriendRequestModule } from './friend-request/friend-request.module';
import { AuthentGuard } from './auth/guards/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { PostReactionModule } from './PostReaction/postreaction.module';
import { CommentReactionModule } from './comment-reaction/comment-reaction.module';
import { RepostsModule } from './reposts/reposts.module';
import { CompanyModule } from './company/company.module';
import { FollowerModule } from './follower/follower.module';
import { JobPostModule } from './job-post/job-post.module';
import { LocationModule } from './location/location.module';
import { WorkExperienceModule } from './work-experience/work-experience.module';
import { JobApplication } from './job-application/job-application.entity';
import { JobApplicationModule } from './job-application/job-application.module';
import { RoleModule } from './role/role.module';
const cookieSession = require('cookie-session');
@Module({
  imports: [
    // Make sure ConfigModule is imported to provide access to ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here too
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '600s' },
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/Images',
      rootPath: join(__dirname, '..', '..', 'Images'),
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    AuthModule,
    PostsModule,
    SkillsModule,
    ChatRoomModule,
    MessageModule,
    FriendsModule,
    CommentsModule,
    FriendRequestModule,
    PostReactionModule,
    CommentReactionModule,
    RepostsModule,
    CompanyModule,
    FollowerModule,
    JobPostModule,
    LocationModule,
    WorkExperienceModule,
    JobApplicationModule,
    RoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ChatGateway,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
    {
      provide: APP_GUARD,
      useClass: AuthentGuard,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['dasfaf'],
        }),
      )
      .forRoutes('*');
  }
}
