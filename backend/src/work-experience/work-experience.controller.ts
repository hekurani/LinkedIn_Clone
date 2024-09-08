import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { WorkExperienceService } from './work-experience.service';
import { CreateWorkExperienceDto } from './dto/CreateWorkExperience.dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { UpdateWorkExperienceDto } from './dto/UpdateWorkExperienceDto.dto';

@Controller('work-experience')
export class WorkExperienceController {
    constructor(private readonly WorkExperienceService:WorkExperienceService){}
    @Post()
    createWorkExperience(@Body() createWorkExperience: CreateWorkExperienceDto,@AuthUser() user: {userId:number}){
return this.WorkExperienceService.createWorkExperience(createWorkExperience,user?.userId)
    }
    @Get()
    getWorkExperiences(){
return this.WorkExperienceService.getWworkExpereiences();
    }
    @Get('/:id')
    getWorkExperience(@Param('id') id:number){
return this.WorkExperienceService.getWOrkExperience(id);
    }
    @Patch('/:id')
    updateWorkExperience(@Param('id') id:number,@Body() updateWorkExperienceDto:UpdateWorkExperienceDto,@AuthUser() user: {userId:number}){
        return this.WorkExperienceService.updateWorkExperience(id,updateWorkExperienceDto,user?.userId);
    }
}
