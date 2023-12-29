import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from './skills.entity';
import { User } from '../users/user.entity';
@Injectable()
export class SkillsService {
  constructor(@InjectRepository(Skill) private repo: Repository<Skill>,@InjectRepository(User) private userRepository: Repository<User>) {}

   create(name:string,level: string) {
    const skill =  this.repo.create({ name,level });
    return this.repo.save(skill);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let skill = await this.repo.find({ where: { id: id } });
    return skill[0] ?? null;
  }

  async remove(id: number) {
    const skill = await this.repo.findOne({where:{id}});//kushit gabim ka 
    if (!skill) {
      throw new NotFoundException(
        'The skill that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(skill);
  }

  async findAll() {
    return this.repo.find();
  }


  async update(id: number, attrs: Partial<Skill>) {
    const skill = await this.findOne(id);
    if (!skill) {
      throw new NotFoundException('Skill not found');
    }
    Object.assign(skill, attrs);
    return this.repo.save(skill);
  }
}
