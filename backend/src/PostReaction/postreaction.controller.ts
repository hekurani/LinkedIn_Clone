import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { CreateReactionDto } from './dto/CreateReactionDto.dto';
import { UpdateReactionDto } from './dto/UpdateReactionDto.dto';
import { ReactionService } from './postreaction.service';
import { DeleteReactionDto } from './dto/DeleteReactionDto.dto';
@Controller('postreaction')
export class ReactionController {
  constructor(private readonly reactionService: ReactionService) {}
  @Post()
  createLike(
    @AuthUser() user: { userId: number },
    @Body() createReactionDto: CreateReactionDto,
  ) {
    return this.reactionService.createReaction(
      user?.userId,
      createReactionDto.postId,
      createReactionDto.status,
    );
  }

  @Delete()
  deleteLike(
    @AuthUser() user: { userId: number },
    @Body() deleteReactionDto: DeleteReactionDto,
  ) {
    return this.reactionService.deleteReaction(
      user?.userId,
      deleteReactionDto.postId,
    );
  }
  @Patch()
  updateReaction(
    @AuthUser() user: { userId: number },
    @Body() updateReactionDto: UpdateReactionDto,
  ) {
    return this.reactionService.updateReaction(
      user?.userId,
      updateReactionDto.postId,
      updateReactionDto.status,
    );
  }
}
