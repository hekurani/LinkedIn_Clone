import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { commentreaction } from './comment-reaction.entity';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';
import { Repository } from 'typeorm';

@Injectable()
export class CommentReactionService {
constructor( @InjectRepository(commentreaction)
private readonly reactionRepository: Repository<commentreaction>,
private readonly usersService: UsersService,
private readonly commentsService: CommentsService){}
   async createCommentReaction(userId:number,commentId:number,reactionStatus:string){
        const user=await this.usersService.findOne(userId); 
        const comment=await this.commentsService.findOne(commentId);
  
  if(!user) throw new NotFoundException("No user found!");
  if(!comment) throw new NotFoundException('No post was found with that id!')
    const commentReaction = await this.reactionRepository.find({
        where: {
            user:{id:userId}, comment:{id:commentId}
        }
    });
    if(commentReaction.length) throw new ForbiddenException("This comment-reaction object already exists!");
  const reactionComment= this.reactionRepository.create({
    user,
    reactionType:reactionStatus,
    comment
  })
  await this.reactionRepository.save(reactionComment);
      return reactionComment;
    }
   async deleteCommentReaction(userId:number,commentId:number){
        const commentReaction = await this.reactionRepository.findOne({
            where: {
                user:{id:userId}, comment:{id:commentId}
            }
        });
        if(!commentReaction) throw new NotFoundException("The post or user doesnt exists!");
    
        await this.reactionRepository.delete(commentReaction.id);
    return{
        status:'success'
    }    
    }
   async updateCommentReaction(userId:number,commentId:number,reactionStatus:string){
    
  await this.reactionRepository.update(
    { user:{id:userId}, comment:{id:commentId}  },
    { reactionType: reactionStatus } 
);
const commentReaction = await this.reactionRepository.findOne({ where: { user:{id:userId}, comment:{id:commentId} } });
if(!commentReaction) throw new NotFoundException("The post or user doesnt exists!");
return {
    status: 'success',
    commentReaction 
};
    }
}
