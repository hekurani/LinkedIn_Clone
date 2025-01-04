import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';

@Controller('follower')
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}
  @Post()
  sendFollow(
    @Body() createFollowerDto: { id: number },
    @AuthUser() user: { userId: number },
  ) {
    return this.followerService.sendFollow(createFollowerDto.id, user?.userId);
  }

  @Get('/company/:id')
  getFollowers(@Param('id') id: number) {
    return this.followerService.getFollowers(id);
  }

  @Delete('/:id')
  unFollow(@Param('id') id: number) {
    return this.followerService.unFollow(id);
  }
}
