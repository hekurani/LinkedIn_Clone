import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {  ProfileSection } from './entities/profile-section.entity';
import { User } from '../users/user.entity';
@Injectable()
export class ProfileService {
  constructor(@InjectRepository(ProfileSection) private repo: Repository<ProfileSection>,@InjectRepository(User) private userRepository: Repository<User>) {}

async createProfileSection(name:string,ifPriority:string) {
    const allProfileSections = await this.repo.find();
 //me gjet ne baze te emrit nese ekziston nje profile section me ate emer qe mos me marr tutje
    if(allProfileSections.find((profileSection)=>profileSection.name==name)){
        throw new NotFoundException('Profile Section already exists');
    }
    //nese prioriteti eshte thate atehere krijojme vetem me emer  sepse ka default value  
    if(ifPriority.trim()==''){

    const profileSection = this.repo.create({ name });

     await this.repo.save(profileSection);
     return "profile section"+profileSection.id +"has been created";
    }
    //nese ka prioritet atehere krijojme me emer dhe prioritet
    else {
        const priority = ifPriority;
        const profileSection = this.repo.create({ name, priority });
       await this.repo.save(profileSection);
        return "profile section"+profileSection.id +"has been created";
    }
  }

  async findAllProfileSections ():Promise<ProfileSection[]> {
    if (!this.repo) {
      return null;
    }
    if((await this.repo.find()).length==0){
        throw new NotFoundException('No profile section found');
        }
    return  await this.repo.find();
  }

  async findOne(id: number):Promise<ProfileSection>{
    if (!id) {
      return null;
    }
    let profileSection = await this.repo.findOne({ where: { id: id }});
    if (!profileSection) {
      throw new NotFoundException('Profile Section not found');
    }

    return profileSection;
  }
  async updatedProfileSection(id: number, attrs: Partial<ProfileSection>) {
    const profileSection = await this.repo.findOne({where:{id:id}});
    if (!profileSection) {
      throw new NotFoundException('Profile Section not found');
    }
    //different from obbject assign
    if(attrs.name){
    profileSection.name = attrs.name;
    }
    if(attrs.priority){
    profileSection.priority = attrs.priority;
    }
    return this.repo.save(profileSection);
  }
  async removeProfileSection(id: number){
    const profileSection = await this.repo.findOne({where:{id}});
    if (!profileSection) {
      throw new NotFoundException(
        'The profile section that you wanted to delete doesnt exist at all!',
      );
    }
    await this.repo.remove(profileSection);
    return {message:"Profile section has been deleted"};
  }

 
    
}
  
  
  




