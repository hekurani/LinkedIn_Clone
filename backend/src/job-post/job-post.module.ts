import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { jobPost } from './job-post.entity';
import { company } from 'src/company/company.entity';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { WorkExperience } from 'src/work-experience/work-experience.entity';
import { Skill } from 'src/skills/skills.entity';
import { city } from 'src/location/entity/city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([company, Skill, city, jobPost, WorkExperience]),
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
