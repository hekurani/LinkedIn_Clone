import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { Friend } from './friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private friend: Repository<Friend>,
    private userService: UsersService,
  ) {}
async getFriends(userId: number, searchTerm: string) {
  const friends = await this.friend.find({
    where: [{ sender: { id: userId } }, { receiver: { id: userId } }],
    relations: ['sender', 'receiver'],
  });

  // Get only the "other user"
  let friendList = friends.map((friend) =>
    friend.sender.id === userId ? friend.receiver : friend.sender,
  );

  // Apply search
  if (searchTerm) {
    const lower = searchTerm.toLowerCase();
    friendList = friendList.filter(
      (f) =>
        f.name.toLowerCase().includes(lower) ||
        f.lastname.toLowerCase().includes(lower) ||
        f.email.toLowerCase().includes(lower),
    );
  }
  console.log({friendList})
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
