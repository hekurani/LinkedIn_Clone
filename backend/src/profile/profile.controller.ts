import { Controller, Post, Body,Get,Delete,Param,Put } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileSectionDto } from './dtos/create-profile-section.dto';
import { Public } from 'src/auth/decorators/Public-Api.decorator';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}
  //PER ME GET ALL PROFILE SECTIONS
  @Public()
  @Get('/section/allProfileSections')
  findAllProfileSections(){
      return this.profileService.findAllProfileSections();
  }
  //PER ME KRIJU PROFILE SECTION
  @Public()////per testim duhet te largohet me pas ne implementim front-back
  @Post('/section/createProfileSection')
  async sendMessage(@Body() payload :  CreateProfileSectionDto) {
    //nese ka edhe priority ateher krijoje me ate me name dhe priority
    if(payload.priority){
        return this.profileService.createProfileSection(payload.name,payload.priority);
    }
    //nese ska priority ateher krijoje me name vetem dhe empty string vetem per ndihmese 
    else
    {
        return this.profileService.createProfileSection(payload.name,'');
    }
   
  }
//PER ME GJET PROFILE SECTION ME ID T CAKTUME DMTH VETEM 1 PROFILE SECTION
  @Public()
  @Get('/section/:id')
    findProfileSection(@Param('id') id:string){
        if(!id){
            return null;
        }
        return this.profileService.findOne(parseInt(id));
    }
    //PER ME UPDATE PROFILE SECTION
    @Public()
    @Put('/section/:id')
    async updateProfileSection(@Param('id') id: string, @Body() updateProfileSectionDto: CreateProfileSectionDto) {
      return this.profileService.updatedProfileSection(parseInt(id), updateProfileSectionDto);
    } 
    //PER ME FSHI PROFILE SECTION
    @Public()
    @Delete('/section/:id')
    removeProfileSection(@Param('id') id:string){
        return this.profileService.removeProfileSection(parseInt(id));
    }


 

  


}
