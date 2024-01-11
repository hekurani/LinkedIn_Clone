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
const cookieSession=require('cookie-session')
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:`.env.${process.env.NODE_ENV}`
    }),
TypeOrmModule.forRoot(dataSourceOptions)
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
  
  ,UsersModule, AuthModule, PostsModule, SkillsModule],
  controllers: [AppController],
  providers: [AppService,
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
