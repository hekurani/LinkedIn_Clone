import { Module } from '@nestjs/common';
import { SkillsController } from './skills.controller';
import { SkillsService } from './skills.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from '../auth/guards/auth.guard'; 
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Skill } from './skills.entity';
import { User } from '../users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([User,Skill]),JwtModule,
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
  controllers: [SkillsController],
  exports:[SkillsService],
  providers: [SkillsService,],
})
export class SkillsModule {}