import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { Posts } from '../posts/post.entity';
import { Comment } from 'src/comments/Entity/comment.entity';
import { Skill } from 'src/skills/skills.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { company } from 'src/company/company.entity';
import { AuthModule } from 'src/auth/auth.module';
import { CompanyModule } from 'src/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, company, Posts, Comment, Skill, Role]),
    JwtModule,
    forwardRef(() => AuthModule),
    forwardRef(() => CompanyModule)
  ],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    RoleService,
    { provide: APP_INTERCEPTOR, useClass: CurrentUserInterceptor },
  ],
})
export class UsersModule {}
