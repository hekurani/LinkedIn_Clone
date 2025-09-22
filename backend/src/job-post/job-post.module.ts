import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { company } from 'src/company/company.entity';
import { JobApplication } from 'src/job-application/job-application.entity';
import { city } from 'src/location/entity/city.entity';
import { Skill } from 'src/skills/skills.entity';
import { UsersModule } from 'src/users/users.module';
import { WorkExperience } from 'src/work-experience/work-experience.entity';
import { JobPostController } from './job-post.controller';
import { jobPost } from './job-post.entity';
import { JobPostService } from './job-post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([company, Skill, city, jobPost, WorkExperience, JobApplication]),
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
    }),
  ],
  providers: [JobPostService],
  controllers: [JobPostController],
})
export class JobPostModule {}
