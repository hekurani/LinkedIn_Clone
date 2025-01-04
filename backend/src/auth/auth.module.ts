import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthentGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MulterModule } from '@nestjs/platform-express';
import { MailService } from 'src/mailer-forgot-password/mail.service';
import { RolesService } from 'src/roles/roles.service';
import { Role } from 'src/roles/Roles.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
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
    }),
    MulterModule.register({
      dest: './',
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    RolesService,
    {
      provide: APP_GUARD,
      useClass: AuthentGuard,
    },
  ],
})
export class AuthModule {}
