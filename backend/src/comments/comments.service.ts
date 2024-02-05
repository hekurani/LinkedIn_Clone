import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { User } from '../users/user.entity';
@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>,@InjectRepository(User) private userRepository: Repository<User>) {}

   async create(text:string,userId:number) {
    const user = await this.userRepository.findOne({where:{id:userId}});
    if(!user){
      throw new NotFoundException('User not found');
    }
    
    const comment =  this.repo.create({ text ,user,publishDate:new Date()});
    return this.repo.save(comment);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let comment = await this.repo.findOne({ where: { id: id } });
    if(!comment){
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async remove(id: number) {
    const comment = await this.repo.findOne({where:{id}});
    if (!comment) {
      throw new NotFoundException(
        'The comment that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(comment);
  }

  async findAll() {
    return this.repo.find();
  }


async update(id: number, attrs: Partial<Comment>) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) {
        throw new NotFoundException('Comment not found');
    }

    await this.repo.update(id, attrs);
    return "Updated comment successfully!";
}
} 