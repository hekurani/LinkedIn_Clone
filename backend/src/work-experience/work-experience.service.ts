import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkExperienceDto } from './dto/CreateWorkExperience.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkExperience } from './work-experience.entity';
import { company } from 'src/company/company.entity';
import { UsersService } from 'src/users/users.service';
import { UpdateWorkExperienceDto } from './dto/UpdateWorkExperienceDto.dto';

@Injectable()
export class WorkExperienceService {
    constructor(@InjectRepository(WorkExperience) private workExperienceRepo: Repository<WorkExperience>, private userService: UsersService,@InjectRepository(company) private companyrepo : Repository<company>){}
   async createWorkExperience(createWorkExperienceDto:CreateWorkExperienceDto,userId:number){
    const startDate=new Date(createWorkExperienceDto.startDate);
    const endDate=createWorkExperienceDto.endDate.length?new Date(createWorkExperienceDto.endDate):null;
    if(startDate>new Date()) throw new ForbiddenException("You are not allowed to set an startDate greater than today!");
    const user=await this.userService.findOne(userId);
   
    if(!user) throw new NotFoundException("there's no user with this id!");
    const company=await this.companyrepo.findOne({where:{id:createWorkExperienceDto.companyId}});
    if(!company) throw new NotFoundException("There's no company with that id!");
const workExperience= this.workExperienceRepo.create({...CreateWorkExperienceDto,company,employer:user,startDate,endDate});
const savedWorkExperience=await this.workExperienceRepo.save(workExperience);
return{
    status:'success',
    savedWorkExperience
}
    }
   async getWOrkExperience(id:number){
    const workExperience=await this.workExperienceRepo.findOne({where:{id:id}});
    return {
        status:'success',
        workExperience
    }
   }
   async getWworkExpereiences(){
    const workExperiences=await this.workExperienceRepo.find();
    return {
        status:'success',
        workExperiences
    }
   }
   async updateWorkExperience(
    workExperienceId: number,
    updateWorkExperienceDto: UpdateWorkExperienceDto,
    userId: number
): Promise<WorkExperience> {
    let workExperience = await this.workExperienceRepo.findOne({
        where: { id: workExperienceId },
    });

    if (!workExperience) {
        throw new NotFoundException("Work experience not found");
    }

    let startDate;
    if (updateWorkExperienceDto.startDate && updateWorkExperienceDto.startDate.length) {
        startDate = new Date(updateWorkExperienceDto.startDate);
        if (startDate > new Date()) {
            throw new ForbiddenException("Start date cannot be greater than today");
        }
    }

    let endDate;
    if (updateWorkExperienceDto.endDate) {
        endDate = updateWorkExperienceDto.endDate.length ? new Date(updateWorkExperienceDto.endDate) : null;
    }

    const user = await this.userService.findOne(userId);
    if (!user) {
        throw new NotFoundException("User not found");
    }

    if (workExperience.employer.id !== user.id) {
        throw new ForbiddenException("You can't edit someone else's work experience");
    }

    let company;
    if (updateWorkExperienceDto.companyId) {
        company = await this.companyrepo.findOne({
            where: { id: updateWorkExperienceDto.companyId },
        });
        if (!company) {
            throw new NotFoundException("Company not found");
        }
    }

    // Update the work experience with provided data
    await this.workExperienceRepo.update(workExperienceId, {
        ...updateWorkExperienceDto,
        startDate,
        endDate,
        company: company ? company : workExperience.company, // keep existing company if not updating
    });

    // Fetch and return the updated work experience
    return await this.workExperienceRepo.findOne({
        where: { id: workExperienceId },
    });
}
}
