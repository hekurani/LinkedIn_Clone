import { Controller, Patch } from '@nestjs/common';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create.dto.entity';
import { UpdateCommentDto } from './dto/update.dto.entity';
import { Public } from 'src/auth/decorators/Public-Api.decorator';


@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto.text, createCommentDto.userId,createCommentDto.postId);
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