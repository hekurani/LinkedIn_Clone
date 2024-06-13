import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendRequest } from './friend-request.entity';
import { Not, Repository } from 'typeorm';
import { Friend } from 'src/friends/friends.entity';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { FriendRequestGateway } from './gateway-sockets/friend-request.gateway';
import { FriendsGateway } from './gateway-sockets/friends.gateway';
@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
    private readonly friendRequestRepository: Repository<FriendRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<FriendRequest>,
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
    private readonly usersService: UsersService,
    private readonly friendRequestGateway: FriendRequestGateway,
    private readonly friendsGateway: FriendsGateway,

  ) {}
  async createFriendRequest(userId: number, id: number) {
    const user = await this.usersService.findOne(userId);
    const receiver = await this.usersService.findOne(id);
    if (!receiver) {
      throw new NotFoundException('User not found');
    }
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.id === id) {
      throw new ForbiddenException(
        'You are not allowed to send request to yourself',
      );
    }
    const existRequest = await this.requestIsPending(user, receiver);
    if (existRequest) {
      throw new ForbiddenException('This request already exists');
    }
    const exitsFriend = await this.friendRepository.findOne({
      where: [
        {
          sender: user,
          receiver: receiver,
        },
        {
          sender: receiver,
          receiver: user,
        },
      ],
    });
    if (exitsFriend) {
      throw new ForbiddenException(
        'You are friends, you cant make an request!',
      );
    }
    const friend = this.friendRequestRepository.create({
      sender: user,
      receiver,
      status: 'pending',
    });
    receiver.countUnseenConnections = user.countUnseenConnections + 1;
    await this.userRepository.save(receiver);
    const friendRquest = await this.friendRequestRepository.save(friend);
    this.friendRequestGateway.server.emit('newFriendRequest', friendRquest);
    return {
      status: 'success',
      data: {
        friendRquest,
      },
    };
  }
  async requestIsPending(userOne: User, userTwo: User) {
    const friendRequest = await this.friendRequestRepository.findOne({
      where: [
        {
          sender: userOne,
          receiver: userTwo,
          status: 'pending',
        },
        {
          sender: userTwo,
          receiver: userOne,
          status: 'pending',
        },
      ],
    });
    return friendRequest;
  }
  async getRequestById(id: number) {
    const request = await this.friendRequestRepository.findOne({
      where: { id },
    });
    if (!request) throw new NotFoundException('This request is not found!');
    return request;
  }
  async getSendedRequestsByUserId(userId: number): Promise<FriendRequest[]> {
    const user = await this.usersService.findOne(userId);
    return this.friendRequestRepository.find({
      where: {
        status: 'pending',
        sender: user,
      },
      relations: ['sender', 'receiver'],
    });
  }
  async getReceivedRequestsByUserId(userId: number): Promise<FriendRequest[]> {
    const user = await this.usersService.findOne(userId);
    return this.friendRequestRepository.find({
      where: {
        status: 'pending',
        receiver: user,
      },
    });
  }
  getFriendRequest(id: number): Promise<FriendRequest> {
    return this.friendRequestRepository.findOne({
      where: {
        id: id,
      },
    });
  }
  async acceptRequest(
    userId: number,
    id: number,
  ): Promise<{
    friend: Friend;
    friendRequest: FriendRequest;
  }> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!id) {
      throw new NotFoundException(
        'The request that you want to accept is not defined',
      );
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!friendRequest) {
      throw new NotFoundException("There's no friend request defined");
    }
    if (friendRequest.status === 'accepted') {
      throw new ForbiddenException('The request its already accepted');
    }
    if (friendRequest.sender === user) {
      throw new ForbiddenException('You cant accept request of yourself');
    }
    friendRequest.status = 'accepted';
   await this.friendRequestRepository.save(friendRequest)
    const friend = this.friendRepository.create({
      sender: {
        id: friendRequest.sender.id,
      },
      receiver: { id: friendRequest.receiver.id },
    });
    const savedFriend = await this.friendRepository.save(friend);
    this.friendsGateway.server.emit('newestFriend', savedFriend);
    return {
      friend: savedFriend,
      friendRequest,
    };
  }
  async cancelRequest(user: User, id: number): Promise<{ status: String }> {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!id) {
      throw new NotFoundException(
        'The request that you want to cancel is not defined',
      );
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!friendRequest) {
      throw new NotFoundException('The request is not defined');
    }
    if (friendRequest.status !== 'pending') {
      throw new ForbiddenException(
        'You cant cancel an request thats not in pending state',
      );
    }
    if (friendRequest.receiver === user) {
      throw new ForbiddenException('You cant cancel requst to yourself');
    }
    await this.friendRequestRepository.delete({
      id: id,
    });
    return {
      status: 'success',
    };
  }

  async rejectRequest(user: User, id: number) {
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!id) {
      throw new NotFoundException(
        'The request that you want to cancel is not defined',
      );
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!friendRequest) {
      throw new NotFoundException('The request is not defined');
    }
    if (friendRequest.status !== 'pending') {
      throw new ForbiddenException(
        'You cant reject an request thats not in pending state',
      );
    }
    if (friendRequest.sender === user) {
      throw new ForbiddenException('You cant reject requst to yourself');
    }
    await this.friendRequestRepository.delete({
      id: id,
    });
    if (friendRequest.receiver !== user) {
      throw new ForbiddenException(
        'Ypu cant reject an request if you didnt send it',
      );
    }
    friendRequest.status = 'rejected';
    await this.friendRequestRepository.save(friendRequest);
    return {
      status: 'success',
    };
  }
  async getFriendRequestsByUserId(id: number, userId: number) {
    const authUser = await this.usersService.findOne(id);
    if (!authUser) {
      throw new NotFoundException('You are not authenthicated, Please LogIn!');
    }
    if (!userId) {
      throw new NotFoundException("there's no user to check the request");
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: [
        {
          sender: authUser,
          receiver: {
            id: userId,
          },
        },
        {
          sender: {
            id: userId,
          },
          receiver: authUser,
        },
      ],
    });
    return friendRequest;
  }
  async blockFriendRequest(id: number, userId: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User is not authenthicated!');
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: [
        {
          sender: user,
          receiver: {
            id: userId,
          },
        },
        {
          sender: {
            id: userId,
          },
          receiver: user,
        },
      ],
    });
    if (!friendRequest) {
      const receiver = await this.usersService.findOne(userId);
      if (!receiver) {
        throw new NotFoundException("There's no user found");
      }
      const friendRequest = this.friendRequestRepository.create({
        sender: user,
        receiver,
        status: 'blocked',
      });
      const friendRquest =
        await this.friendRequestRepository.save(friendRequest);
      return;
    }
    if (friendRequest.sender === user && friendRequest.receiver === user) {
      throw new NotFoundException('You cant block yourself');
    }
    if (friendRequest.status === 'blocked') {
      return;
    }
    friendRequest.status = 'blocked';
    await this.friendRequestRepository.save(friendRequest);
    return {
      status:'success'
    };
  }
  async unBlockFriendRequest(id: number, userId: number) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User is not authenthicated!');
    }
    const friendRequest = await this.friendRequestRepository.findOne({
      where: [
        {
          sender: user,
          receiver: {
            id: userId,
          },
        },
        {
          sender: {
            id: userId,
          },
          receiver: user,
        },
      ],
    });
    if (!friendRequest) {
      throw new NotFoundException("There's no friendRequest found!");
    }
    if (friendRequest.sender === user && friendRequest.receiver === user) {
      throw new NotFoundException(
        'You are not allowed to perform this action!',
      );
    }
    await this.friendRequestRepository.delete(friendRequest);
    return {
      status:'success'
    };
  }
}
