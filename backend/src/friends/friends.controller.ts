import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, SetMetadata, UseInterceptors } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { User } from 'src/users/user.entity';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private friendsService: FriendsService) {}
  @Get()
  async getFriends(@AuthUser() user: { userId: number },   @Query('searchTerm') searchTerm: string) {
    console.log({searchTerm})
    const friends = await this.friendsService.getFriends(user?.userId, searchTerm);
    return friends;
  }

  @Delete(':id')
  async deleteFriend(
    @AuthUser() user: { userId: number },
    @Param('id', ParseIntPipe) removeUserId: number,
  ) {
    const friend = await this.friendsService.deleteFriend({
      userId: user?.userId,
      deleteFriendId: removeUserId,
    });
    return {
      userId: user?.userId,
      friend,
    };
  }
}
