import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileSection } from './entities/profile-section.entity';
import { User } from '../users/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileSection,User]),JwtModule,
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
  controllers: [ProfileController],
  exports:[ProfileService],
  providers: [ProfileService],
})
export class ProfileModule {}