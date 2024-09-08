import { Module } from '@nestjs/common';
import { WorkExperienceController } from './work-experience.controller';
import { WorkExperienceService } from './work-experience.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WorkExperience } from './work-experience.entity';
import { company } from 'src/company/company.entity';

@Module({ imports: [
  TypeOrmModule.forFeature([WorkExperience,company]),
  UsersModule,
  ConfigModule,
  JwtModule.registerAsync({
    imports: [ConfigModule], 
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      global: true,
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '600s' },
    }),
  })],
  controllers: [WorkExperienceController],
  providers: [WorkExperienceService]
})
export class WorkExperienceModule {}