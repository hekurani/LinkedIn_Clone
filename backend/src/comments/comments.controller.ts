import { Controller, Patch } from '@nestjs/common';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.dto.entity';
import { UpdateCommentDto } from './dto/update.dto.entity';
import { Public } from 'src/auth/decorators/Public-Api.decorator';
import { CreateReplyDto } from './dto/createreply.dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';



@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post()
    create(@Body() createCommentDto: CreateCommentDto,@AuthUser() user: {userId:number}) {
        return this.commentsService.create(createCommentDto.text,user.userId,createCommentDto.postId);
    }
    
    @Post('/:id/reply')
    createReply(@Body() createReplyDto:CreateReplyDto,@Param('id') id:number,@AuthUser() user: {userId:number}){
return this.commentsService.createReply(createReplyDto.reply,id,user?.userId);
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.commentsService.findOne(id);
    }
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.commentsService.remove(id);
    }

    @Get()
    findAll() {
        return this.commentsService.findAll();
    }

    @Public()
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, updateCommentDto);
    }
}