import { Body, Controller, Get, Post, UseGuards,Request, Injectable, Param, Delete, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostDTO } from './dto/post.dto'; 
import { AuthentGuard } from '../auth/guards/auth.guard';
import { PostsService } from './posts.service';
import { Public } from '../auth/decorators/Public-Api.decorator';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './dto/create-post-dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
const storage = diskStorage({
  destination: '../',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    cb(null, `/Images/${name}-${randomName}${extension}`);
  },
});
@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService){}
    
    @Post()
    @UseInterceptors(
      FilesInterceptor('image', 20, {
        storage: storage,
        fileFilter: imageFileFilter,
      }),
    )
    createPost(@AuthUser() user: {userId:number},@Body() postDTO:CreatePostDto,@UploadedFiles() files){
      const response = [];
      if(files) {
        files.forEach(file => {
          response.push(file.filename);
        });
      }

        return this.postService.create(user?.userId,postDTO,response);
       
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
    @Get('/:id/comments')
    getPostComments(@Param('id') id:string){
return this.postService.getPostComments(parseInt(id));
    }
@Get()
getPosts(@AuthUser() user: {userId:number}){
  return this.postService.getPosts(user.userId);
}
  

}
