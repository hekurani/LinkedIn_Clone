import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { CreateRepostDto } from './dto/CreateRepostDto.dto';
import { RepostsService } from './reposts.service';

@Controller('reposts')
export class RepostsController {
  constructor(private readonly repostService: RepostsService) {}
  @Post()
  createRepost(
    @AuthUser() user: { userId: number },
    @Body() createRepostDto: CreateRepostDto,
  ) {
    return this.repostService.createRepost(
      user?.userId,
      createRepostDto.postId,
    );
  }
  @Delete()
  deleteRepost(
    @AuthUser() user: { userId: number },
    @Body() deleteRepostDto: CreateRepostDto,
  ) {
    return this.repostService.deleteRepost(
      user?.userId,
      deleteRepostDto.postId,
    );
  }
}
