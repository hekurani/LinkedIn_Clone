import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from '../auth/guards/auth.guard'; 
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { User } from '../users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Posts]),JwtModule,
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
  controllers: [PostsController],
  exports:[PostsService],
  providers: [PostsService,],
})
export class PostsModule {}