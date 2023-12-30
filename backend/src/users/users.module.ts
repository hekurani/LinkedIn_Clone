import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Posts } from '../posts/post.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Posts]),JwtModule],
  exports:[UsersService],
  controllers: [UsersController],
  providers: [UsersService,AuthService,{provide:APP_INTERCEPTOR,useClass:CurrentUserInterceptor}]
})
export class UsersModule {}