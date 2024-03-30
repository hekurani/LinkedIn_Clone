import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './user.entity';
import { Posts } from '../posts/post.entity';
import {randomBytes,scrypt as _scrypt} from 'crypto'

import { FindManyOptions } from 'typeorm';
import { promisify } from 'util';
const scrypt=promisify(_scrypt);
@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>,@InjectRepository(Posts) private postRepository: Repository<Posts>) {}

  async create(name:string,lastname:string,email: string, password: string,imageProfile:string) {
    console.log("here");
    const user = this.repo.create({ name,lastname,email, password,imageProfile });
    return this.repo.save(user);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
  
    const user = await this.repo.findOne({
      where: { id },
      select: ['id', 'email', 'imageProfile','name','lastname','RefreshToken'],
    });
  
    return user ?? null;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(
        'The user that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(user);
  }

  findAll() {
    return this.repo.find();
  }
  findByPassword(email: string,isPasswordNull:Boolean) {
    if(isPasswordNull){
    return this.repo.find({ where: { email ,password:null} });
    }
    return  this.repo.find({ where: { email }});
  }
  find(email: string) {
    
    return  this.repo.find({ where: { email }});
  }
  async addSkillToUser(userId: number, skillId: number): Promise<User | null> { //,metod qe na mudeson te shtojm nje skil per nje user
    const user = await this.findOne(userId); //gjejm userin
    if (!user) { //nese nuk vjen 
      throw new NotFoundException('User not found');//vendosim not found exception
    }

    if (!user.skills.includes(skillId)) { //nese nuk e ka ja shtojm
      user.skills.push(skillId); //e bejm push
     const loco =  await this.repo.save(user); //save

    }

    return user; //return user ose mundemi te kthejm edhe diqka tjeter
  }

  async getUserSkills(userId: number): Promise<number[] | null> { //metod per mi marr krejt skills te userit
    const user = await this.findOne(userId);//e gjem
    if (!user) { //nese nuk e gjejm
      throw new NotFoundException('User not found');//not found excp
    }

    return user.skills || null; // Return the user's skills ose null
  }

  async update(id: number, attrs: Partial<User>, refreshToken?: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //passwordi qe na ka ardh nese na ka ardh e hashum
    if (attrs.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
      attrs.password = salt + '.' + hash.toString('hex');
    }
  
 
  
    // Handle RefreshToken 
    if (refreshToken) {
      user.RefreshToken = refreshToken;
    }
  
    Object.assign(user, attrs);
    return this.repo.save(user);
  }
  
  async getUserPosts(user_id: number): Promise<Posts[]> {
    const user = await this.repo.findOne({ where: { id: user_id } });
    if (!user) {
      return [];
    }
  
    const options: FindManyOptions<Posts> = {
      where: {
        user: { id: user.id }, 
      },
    };
  
    return this.postRepository.find(options);
  }
}
