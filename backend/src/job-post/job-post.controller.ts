import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateJobPostDto } from './dto/CreateJobPost.dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { JobPostService } from './job-post.service';
import { UpdateJobPostDto } from './dto/updateJobPost.dto';

@Controller('job-post')
export class JobPostController {
  constructor(private jobPostService: JobPostService) {}

  @Post()
  createJobPost(
    @Body() createJobPostDto: CreateJobPostDto,
    @AuthUser() user: { userId: number },
  ) {
    return this.jobPostService.createJobPost(createJobPostDto, user?.userId);
  }

  @Get()
  getJobPosts() {
    return this.jobPostService.getJobPosts();
  }

  @Get('/:id')
  getJobPost(@Param('id') id: number) {
    return this.jobPostService.getJobPost(id);
  }

  @Patch('/:id')
  updateJobPost(
    @Body() updateJobPostDto: UpdateJobPostDto,
    @Param('id') id: number,
    @AuthUser() user: { userId: number },
  ) {
    return this.jobPostService.updateJobPost(
      updateJobPostDto,
      id,
      user?.userId,
    );
  }

  @Delete('/:id')
  deleteJobPost(@Param('id') id: number, @AuthUser() user: { userId: number }) {
    const a = 3;
    return this.jobPostService.deleteJobPost(id, user?.userId);
  }
}
