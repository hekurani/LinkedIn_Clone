import { Controller } from '@nestjs/common';
import { Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create.dto.entity';
import { UpdateCommentDto } from './dtos/update.dto.entity';
import { Public } from 'src/auth/decorators/Public-Api.decorator';


@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}
    @Public()
    @Post()
    create(@Body() createCommentDto: CreateCommentDto) {
        return this.commentsService.create(createCommentDto.text, createCommentDto.userId,createCommentDto.postId);
    }
    @Public()

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.commentsService.findOne(id);
    }
    @Public()

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.commentsService.remove(id);
    }
    @Public()

    @Get()
    findAll() {
        return this.commentsService.findAll();
    }
    @Public()

    @Put(':id')
    update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentsService.update(id, updateCommentDto);
    }
}