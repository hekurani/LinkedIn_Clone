import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from './post.entity';
import { User } from 'src/users/user.entity';
import { CreatePostDto } from './dtos/create-post-dto';
@Injectable()
export class PostsService {
  constructor(@InjectRepository(Posts) private repo: Repository<Posts>,@InjectRepository(User) private userRepository: Repository<User>) {}

   create(id,payload: CreatePostDto,response:string[]) {
     const {description} = payload;
    if(!description && response.length===0) throw new BadRequestException("You have to add description or images to post")
    const post =  this.repo.create({ description,postImages:response,user:id,});
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
    console.log(id) //comming 1 (which is ok)
    const post = await this.repo.findOne({where:{id}});//kushit gabim ka 
    console.log(post)  //coming like null (to be fixed)
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
    return user.posts;
  }

  async findAll(): Promise<{ user: User; posts: Posts[] }[]> {
    const postsWithUsers = await this.repo.find({ relations: ['user'] });
  
    return postsWithUsers.map((post) => ({
      user: post.user,
      posts: [post],
    }));
  }
  


  async update(id: number, attrs: Partial<Posts>) {
    const post = await this.findOne(id);
    if (!post) {
      throw new NotFoundException('User not found');
    }
    Object.assign(post, attrs);
    return this.repo.save(post);
  }
}
