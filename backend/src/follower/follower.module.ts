import { Module } from '@nestjs/common';
import { FollowerController } from './follower.controller';
import { FollowerService } from './follower.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { company } from 'src/company/company.entity';
import { User } from 'src/users/user.entity';
import { Follower } from './follower.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,company,Follower]),
    UsersModule,
    ConfigModule, // Make sure ConfigModule is imported to provide access to ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule here too
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '600s' },
      }),
    })],
  controllers: [FollowerController],
  providers: [FollowerService]
})
export class FollowerModule {}
