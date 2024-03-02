import { MiddlewareConsumer, Module,ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import {ConfigModule,ConfigService} from '@nestjs/config';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { Posts } from './posts/post.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { SkillsModule } from './skills/skills.module';
import {dataSourceOptions} from './db/config/dataSource'
import {Skill} from "./skills/skills.entity";
import { ChatRoomModule } from './chatroom/chatroom.module';
import { MessageModule } from './message/message.module';
import { ChatRoom } from './chatroom/chat.entity';
import { Message } from './message/message.entity';
import { ChatGateway } from './chat.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FriendsModule } from './friends/friends.module';
import { CommentsModule } from './comments/comments.module';
import { ProfileModule } from './profile/profile.module';

const cookieSession=require('cookie-session')
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/Images',
      rootPath: join(__dirname, '..', '..', 'Images'),
    }),
TypeOrmModule.forRoot(dataSourceOptions)/* ({
  inject:[ConfigService],
  useFactory:(config:ConfigService)=>{
    return {
      type:'postgres',
      
      database:config.get<string>('DB_NAME'),
      host:config.get<string>('HOST'),
      username:'postgres',
      port:+config.get<string>('PORT'),
      password:'1234',
      entities:[User,Posts,Skill,ChatRoom,Message],
      synchronize:true
    }
  }
}) */
  //   TypeOrmModule.forRoot({
  //   type:'sqlite',
  //   database:'db.sqlite',
  //   entities:[User,Report],
  //   synchronize:true,
//{
//   inject:[ConfigService],
//   useFactory:(config:ConfigService)=>{
//     return {
//       type:'postgres',
//       database:config.get<string>('DB_NAME'),
//       host:config.get<string>('HOST'),
//       username:'postgres',
//       port:+config.get<string>('PORT'),
//       password:'1234',
//       entities:[User,Posts,Skill],
//       synchronize:true,
//       seeds: ["src/db/seeding/seeds/**/*{.ts,.js}"],
//       factories: ["src/db/seeding/factories/**/*{.ts,.js}"]
//     }
//   }
// }
  // })
  
  ,UsersModule, AuthModule, PostsModule, SkillsModule, ChatRoomModule, MessageModule, FriendsModule,CommentsModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService,ChatGateway,
  {
    provide:APP_PIPE,
    useValue:new ValidationPipe({
      whitelist:true
    })
  }
  ],
})
export class AppModule {
  configure(consumer:MiddlewareConsumer){
consumer.apply(cookieSession({
  keys:['dasfaf']
})).forRoutes('*')
  }
}
