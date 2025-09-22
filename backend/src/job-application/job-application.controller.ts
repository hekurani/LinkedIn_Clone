import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { application } from 'express';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { CreateJobApplicationDto } from './dto/CreateJobApplicationDto.dto';
import { JobApplicationService } from './job-application.service';

@Controller('job-application')
export class JobApplicationController {
  constructor(private readonly jobApplicationService: JobApplicationService) {}
  @Post()
  sendJobApplication(
    @Body() createJobApplicationDto: { jobPostId: string },
    @AuthUser() user: { userId: number },
  ) {
    return this.jobApplicationService.sendJobApplication(
      parseInt(createJobApplicationDto?.jobPostId),
      user?.userId,
    );
  }
  @Get()
  getJobApplications() {
    return this.jobApplicationService.getJobApplications();
  }
  @Get('/:id')
  getJobApplication(@Param('id') id: number) {
    return this.getJobApplication(id);
  }
  @Delete('/:id')
  deleteJobApplication(
    @Param('id') id: number,
    @AuthUser() user: { userId: number },
  ) {
    return this.jobApplicationService.deleteJobApplication(id, user?.userId);
  }
}
