import { Controller, ParseIntPipe } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { UseInterceptors,ClassSerializerInterceptor,Body,Request,Get,Post,Param,Patch,Query, Delete ,SetMetadata} from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { User } from 'src/users/user.entity';

@Controller('friends')
export class FriendsController {
    constructor(private friendsService:FriendsService ){}
    @Get()
    async getFriends(@AuthUser() user:User) {
        const friends = await this.friendsService.getFriends(user);
        return friends;
    }

    @Delete(':id')
    async deleteFriend(@AuthUser() user: User, @Param('id', ParseIntPipe) removeUserId: number) {
        const friend = await this.friendsService.deleteFriend({ userId: user.id, deleteFriendId:removeUserId });
        return {
            userId: user.id,
            friend,
        };
    }

}
