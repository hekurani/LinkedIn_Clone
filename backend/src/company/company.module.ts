import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { company } from './company.entity';
import { User } from 'src/users/user.entity';
import { city } from 'src/location/entity/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, city, company]),
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
      dest: './images',
    }),
  ],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
