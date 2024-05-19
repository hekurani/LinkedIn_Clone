import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Reposts } from './reposts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class RepostsService {
    constructor(@InjectRepository(Reposts) private repostRepository: Repository<Reposts>,private usersService:UsersService,private postService:PostsService){}
    async createRepost(userId:number,postId:number){
   const reposts=await this.repostRepository.find({where:{user:{id:userId},posts:{id:postId}}});
   if(reposts.length) throw new ForbiddenException("This repost already exists!");
   const user=await this.usersService.findOne(userId);
   const post=await this.postService.findOne(postId);
   if(!user) throw new NotFoundException("No user is found");
   if(!post) throw new NotFoundException("No post is found");
const repost = this.repostRepository.create({user,posts:post});
await this.repostRepository.save(repost);    
return{
    status:'success',
    repost
}
}
    
    
    async deleteRepost(userId:number,postId:number){
        const repost=await this.repostRepository.findOne({where:{user:{id:userId},posts:{id:postId}}});
        if(!repost) throw new NotFoundException("no repost found te delete!")
            await this.repostRepository.delete(repost.id);
            return {
        status:'success'}
    }

}
