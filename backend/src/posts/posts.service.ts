import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { User } from 'src/users/user.entity';
import { Comment } from 'src/comments/Entity/comment.entity';
import { CreatePostDto } from './dto/create-post-dto';
import { UsersService } from 'src/users/users.service';
import { FriendsService } from 'src/friends/friends.service';
@Injectable()
export class PostsService {
  constructor(private friendService:FriendsService,private usersService:UsersService,@InjectRepository(Posts) private repo: Repository<Posts>,@InjectRepository(User) private userRepository: Repository<User>) {}

   async create(id:number,payload: CreatePostDto,response:string[]) {
     const {description} = payload;
    if(!description && response.length===0) throw new BadRequestException("You have to add description or images to post")
    const user=await this.usersService.findOne(id);
    const post =  this.repo.create({ description,postImages:response,user});
    return this.repo.save(post);
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let post = await this.repo.find({ where: { id: id } });
    return post[0] ?? null;
  }

  async remove(id: number) {
    const post = await this.repo.findOne({where:{id}});
    if (!post) {
      throw new NotFoundException(
        'The post that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(post);
  }
  async findPostsByUser(userId: number): Promise<Posts[]> {
    const user = await this.userRepository.findOne({where:{id:userId}});
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log(user.posts)
    return user.posts;
  }



  
  
  
async getPostComments(id:number){
return await this.repo.find({where:{id:id},relations:['comments','comments.childComments','comments.parentComment']});
}

async update(id: number, attrs: Partial<Posts>) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('User not found');
    }
    Object.assign(post, attrs);
    return this.repo.save(post);
  }
  isFriendInComment(comment:Comment,userId:number){
    console.log("userId comment: ",comment.user.id,"authUserId: ",userId);
    if(this.friendService.getFriend({userId,friendId:comment.user.id})){
      return comment
    }
    let isFriendInReplies=comment.childComments.some((comment)=>{
      while(comment.childComments.length===0){
        if(this.friendService.getFriend({userId,friendId:comment.user.id})){
          return true;
        }
}
    })
    if(isFriendInReplies)
    {
      return comment;
    }
    return null;

    
  }
  async getPosts(userId:number){
   const posts =await this.repo.find({relations:['user','comments.childComments','comments.parentComment','comments.user']}) as any;

   posts.forEach(post=>{
post.numberComments=post.comments.length;
    let comments=post.comments.filter(async (comment)=>{
  return await comment?.parentComment===null
})
comments=comments.filter((comment)=>{
  return this.isFriendInComment(comment,userId)!==null
})
post.comments=comments;
})
return {posts} as any;
  }
}
