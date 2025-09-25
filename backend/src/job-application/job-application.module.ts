import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { company } from 'src/company/company.entity';
import { jobPost } from 'src/job-post/job-post.entity';
import { UsersModule } from 'src/users/users.module';
import { JobApplicationController } from './job-application.controller';
import { JobApplication } from './job-application.entity';
import { JobApplicationService } from './job-application.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([jobPost, JobApplication, company]),
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
  controllers: [JobApplicationController],
  providers: [JobApplicationService],
})
export class JobApplicationModule {}
