import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { CreateJobApplicationDto } from './dto/CreateJobApplicationDto.dto';
import { JobApplicationService } from './job-application.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { application } from 'express';

@Controller('job-application')
export class JobApplicationController {
    constructor(private readonly jobApplicationService:JobApplicationService){}
    @Post()
    @UseInterceptors(FileFieldsInterceptor(
        [
          { name: 'applications', maxCount: 1 }
        ],
        multerOptions(
          [ '.pdf'], // Permissible file formats
          [{ filename: 'applications', destination: "../Images/application" }] // Destination options
        )
      ))
    sendJobApplication(@Body() createJobApplicationDto:{jobPostId:string},@AuthUser() user: {userId:number},@UploadedFiles() files: { applications?: Express.Multer.File[]}){
        return this.jobApplicationService.sendJobApplication(parseInt(createJobApplicationDto?.jobPostId),user?.userId,files?.applications[0]?.filename);
    }
    @Get()
    getJobApplications(){
return this.jobApplicationService.getJobApplications();
    }
    @Get('/:id')
    getJobApplication(@Param('id') id:number){
return this.getJobApplication(id);
    }
    @Delete('/:id')
    deleteJobApplication(@Param('id') id:number,@AuthUser() user: {userId:number}){
        return this.jobApplicationService.deleteJobApplication(id,user?.userId);
    }
}
