import { Body, Controller, Get, Post, UseGuards,Request, Injectable, Param, Delete, UseInterceptors, UploadedFiles, Patch } from '@nestjs/common';
import { PostDTO } from './dto/post.dto'; 
import { AuthentGuard } from '../auth/guards/auth.guard';
import { PostsService } from './posts.service';
import { Public } from '../auth/decorators/Public-Api.decorator';
import { User } from 'src/users/user.entity';
import { NotFoundException } from '@nestjs/common';
import { FileFieldsInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreatePostDto } from './dto/create-post-dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { multerOptions } from 'src/utils/multer/multerOptions.multer';
import { UpdateJobPostDto } from 'src/job-post/dto/updateJobPost.dto';
import { updatePostDto } from './dto/updatePost.dto'; 
@Controller('posts')
export class PostsController {
    constructor(private postService:PostsService){}
    
    @Post()
    @UseInterceptors(FileFieldsInterceptor(
      [
        { name: 'images', maxCount: 5 },
       
      ],
      multerOptions(
        ['.jpg', '.jpeg', '.png', '.gif'], // Permissible file formats
        [
          { filename: 'images', destination: "../Images/postImages/" }, // Destination for 'logo'
        ]
      )
    ))
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
      return await this.postService.findPostsByUser(parseInt(userId));
     
    }
  
    @Get('/:id')
    findPost(@Param('id') id:string){
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
  
@Patch('/:id')
@UseInterceptors(FileFieldsInterceptor(
  [
    { name: 'images', maxCount: 5 },
   
  ],
  multerOptions(
    ['.jpg', '.jpeg', '.png', '.gif'], // Permissible file formats
    [
      { filename: 'images', destination: "../Images/postImages/" }, // Destination for 'logo'
    ]
  )
))
updatePost(@Param('id') id:string,@Body() updatePostDto:updatePostDto,@AuthUser() user: {userId:number},@UploadedFiles() files:{images?: Express.Multer.File[]}){
  const response = [];
  if(files) {
    files?.images.forEach(file => {
      response.push(file.filename);
    });
  }
  console.log(response);
return this.postService.update(+id,updatePostDto,user?.userId,response);
}
}
