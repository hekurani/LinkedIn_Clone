import { Module } from '@nestjs/common';
import { JobPostService } from './job-post.service';
import { JobPostController } from './job-post.controller';

@Module({
  providers: [JobPostService],
  controllers: [JobPostController]
})
export class JobPostModule {}
