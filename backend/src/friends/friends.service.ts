import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Friend } from './friends.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private friend: Repository<Friend>,
    private userService: UsersService,
  ) {}
  async getFriends(userId: number) {
    const user = await this.userService.findOne(userId);
    const friends = await this.friend.find({
      where: [{ sender: user }, { receiver: user }],
      relations: ['sender', 'receiver'],
    });

    const friendList = friends.map((friend) => {
      if (friend.sender.id === userId) {
        return friend.receiver;
      } else {
        return friend.sender;
      }
    });

    return friendList;
  }
  async getFriend({ userId, friendId }) {
    return this.friend.findOne({
      where: [
        {
          sender: {
            id: userId,
          },
          receiver: {
            id: friendId,
          },
        },
        {
          sender: {
            id: friendId,
          },
          receiver: {
            id: userId,
          },
        },
      ],
    });
  }
  async deleteFriend({ userId, deleteFriendId }) {
    const user = await this.userService.findOne(userId);
    const deleteFriend = await this.userService.findOne(deleteFriendId);
    if (!user || !deleteFriend) {
      throw new NotFoundException('User not found');
    }
    const friend = await this.getFriend({ userId, friendId: deleteFriendId });
    if (!friend) {
      throw new NotFoundException('Friend not found');
    }
    this.friend.delete({
      id: friend.id,
    });
    return {
      status: 'success',
    };
  }
}
