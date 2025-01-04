import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { User } from 'src/users/user.entity';
import { CreateFriendRequestDto } from './dto/CreateFriendRequest.dto';
import { FriendRequestService } from './friend-request.service';

@Controller('friend-request')
export class FriendRequestController {
  constructor(private readonly FriendRequestService: FriendRequestService) {}
  @Post()
  async createFriendRequest(
    @AuthUser() user: { userId: number },
    @Body() { id }: CreateFriendRequestDto,
  ) {
    return this.FriendRequestService.createFriendRequest(user?.userId, id);
  }

  @Get('send')
  getSendedRequestsByUserId(@AuthUser() user: { userId: number }) {
    return this.FriendRequestService.getSendedRequestsByUserId(user?.userId);
  }

  @Get()
  async getReceivedRequestsByUserId(@AuthUser() user: { userId: number }) {
    return this.FriendRequestService.getReceivedRequestsByUserId(user?.userId);
  }

  @Get(':id')
  async getFriendRequest(@Param('id') id: number) {
    return this.FriendRequestService.getFriendRequest(id);
  }

  @Post(':id/accept')
  async acceptFriendRequest(
    @AuthUser() user: { userId: number },
    @Param('id') id: number,
  ) {
    return this.FriendRequestService.acceptRequest(user?.userId, id);
  }

  @Delete(':id/cancel')
  async cancelFriendRequest(
    @AuthUser() user: User,
    @Param('id') requestId: number,
  ) {
    return this.FriendRequestService.cancelRequest(user, requestId);
  }

  @Post(':id/reject')
  async rejectFriendRequest(@AuthUser() user: User, @Param('id') id: number) {
    return this.FriendRequestService.rejectRequest(user, id);
  }

  @Get('user/:id')
  async getFriendRequestsByUserId(
    @AuthUser() user: { userId: number },
    @Param('id') userId: number,
  ) {
    return this.FriendRequestService.getFriendRequestsByUserId(
      user?.userId,
      userId,
    );
  }
  @Post('user/:id/block')
  async blockFriendRequest(
    @AuthUser() user: { userId: number },
    @Param('id') userId: number,
  ) {
    return this.FriendRequestService.blockFriendRequest(user?.userId, userId);
  }
  @Post('user/:id/unblock')
  async unBlockFriendRequest(
    @AuthUser() user: { userId: number },
    @Param('id') userId: number,
  ) {
    return this.FriendRequestService.unBlockFriendRequest(user?.userId, userId);
  }
}
