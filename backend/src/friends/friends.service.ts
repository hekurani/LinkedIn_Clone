import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Friend } from './friends.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class FriendsService {
constructor(@InjectRepository(Friend) private friend: Repository<Friend>,private userService:UsersService){}
    async getFriends(userId:number){
        const user=await this.userService.findOne(userId);
return this.friend.find({
    where: [
        { sender: user },
        {
            receiver: user,
        },
    ]});
    }
    async getFriend({userId,friendId}){
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
        })
    }
    async deleteFriend({userId,deleteFriendId}){
        console.log(userId,deleteFriendId)
const user=await this.userService.findOne(userId);
    const deleteFriend=await this.userService.findOne(deleteFriendId);
if(!user || !deleteFriend){
throw new NotFoundException("User not found")
}
const friend=await this.getFriend({userId,friendId:deleteFriendId});
if(!friend){
throw new NotFoundException("Friend not found");
}
this.friend.delete({
    id:friend.id
});
return {
    status:"success"
}
    }
}
