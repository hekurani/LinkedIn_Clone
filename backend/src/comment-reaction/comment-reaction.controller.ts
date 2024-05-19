import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { CommentReactionService } from './comment-reaction.service';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { DeleteReactionDto } from './dto/DeleteReactionDto.dto';
import { CreateReactionDto } from './dto/CreateReactionDto.dto';
import { UpdateReactionDto } from './dto/UpdateReactionDto.dto';

@Controller('comment-reaction')
export class CommentReactionController {

constructor(private readonly commentReactionservice: CommentReactionService){}
@Post()
createCommentReaction(@AuthUser() user: {userId:number},@Body() createReactionDto:CreateReactionDto){
return this.commentReactionservice.createCommentReaction(user?.userId,createReactionDto.commentId,createReactionDto.status);
}
@Delete()
deleteCommentReaction(@AuthUser() user: {userId:number},@Body() deleteReactionDto:DeleteReactionDto){
    return this.commentReactionservice.deleteCommentReaction(user?.userId,deleteReactionDto.commentId);
}

@Patch()
updateCommentReaction(@AuthUser() user: {userId:number},@Body() updateReactionDto:UpdateReactionDto){
    return this.commentReactionservice.updateCommentReaction(user?.userId,updateReactionDto.commentId,updateReactionDto.status);
}
    
}
