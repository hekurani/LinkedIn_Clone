import { Module } from '@nestjs/common';
import { JobApplicationController } from './job-application.controller';
import { JobApplicationService } from './job-application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobApplication } from './job-application.entity';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { jobPost } from 'src/job-post/job-post.entity';

@Module({ imports: [
  TypeOrmModule.forFeature([jobPost,JobApplication]),
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
  controllers: [JobApplicationController],
  providers: [JobApplicationService]
})
export class JobApplicationModule {}
