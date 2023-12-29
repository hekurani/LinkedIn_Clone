import { Body, Controller, Get, Post, UseGuards,Request, Injectable, Param, Delete } from '@nestjs/common';
import { PostDTO } from './dtos/post.dto'; 
import { AuthentGuard } from '../auth/guards/auth.guard';
import { PostsService } from './posts.service';
import { Public } from '../auth/decorators/Public-Api.decorator';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService){}
    @Post('/create')
    @Public()
    createPost(@Body() postDTO:PostDTO){
        return this.postService.create(postDTO.description);
    }
    @Get('/user/:userId')
    async findPostsByUser(@Param('userId') userId: string) {
      try {
        const posts = await this.postService.findPostsByUser(parseInt(userId));
        if (posts.length === 0) {
          throw new NotFoundException('No posts found for the specified user');
        }
        return posts;
      } catch (error) {
        throw new NotFoundException('User not found');
      }
    }
    @Get('/allPosts')
    findAllUsers(){
        return this.postService.findAll();
    }
    @Get('/:id')
    findPost(@Param('id') id:string){
        if(!id){
            return null;
        }
        return this.postService.findOne(parseInt(id));
    }
    @Delete('/:id')
    remove(@Param('id') id:string){
        return this.postService.remove(parseInt(id));
    }

  

}
