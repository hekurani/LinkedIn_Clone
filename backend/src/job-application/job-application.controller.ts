import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
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

    @Get('/user')
  getJobApplicationsByUserId(
        @AuthUser() user: { userId: number }
  ) {
    return this.jobApplicationService.getjobApplicationsByUserId(user?.userId);
  }

      @Get('/company')
  getJobApplicationsByCompanyId(
      
  ) {
    return this.jobApplicationService.getjobApplicationsByCompanyId(7);
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
