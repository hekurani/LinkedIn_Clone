import { UseInterceptors,ClassSerializerInterceptor,Body,Controller,Get,Post,Param,Patch,Query, Delete ,SetMetadata} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import {Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { Session } from '@nestjs/common/decorators';
import { CurrentUser } from './Decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthentGuard } from '../auth/guards/auth.guard';
import {UseGuards} from '@nestjs/common';
import { Posts } from '../posts/post.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Controller('/users')
@Serialize(UserDto)

export class UsersController 
{
    constructor(private usersService:UsersService,private authService:AuthService){}

@Get('/profile')
async getMe(@CurrentUser() user:User){
    return user
}

@Post('/logout')
signout(@Session() session:any){
    session.userId=null;
}
// @UseGuards(RolesGuard)
// @SetMetadata('roles', ['jobseeker']) //caktojm rolin qe duhet me qen useri per me u qas 
@Patch('/:id/add-skill/:skillId')
async addSkillToUser(
  @Param('id') userId: string,
  @Param('skillId') skillId: string,
): Promise<User | null> {
  return this.usersService.addSkillToUser(parseInt(userId), parseInt(skillId));
}
//metod per mi marr krejt skill te userit
@Get('/:id/skills') // New endpoint to get user's skills
async getUserSkills(@Param('id') userId: string): Promise<number[] | null> {
  return this.usersService.getUserSkills(parseInt(userId));
}

@Get('/colors')
getColors(@Session() session:any){
    console.log("session "+session.color)
    return session.color
}
    @Post('/register')
async createUser(@Body() body: CreateUserDto,@Session() session:any){

}
@Get('/:id/posts')
async getUserPosts(@Param('id') userId: string): Promise<Posts[]> {
  const posts = await this.usersService.getUserPosts(parseInt(userId));
  return posts;
}
@Get('/users/:id')
findUser(@Param('id') id:string) {
    if(!id){
    return null;
}
    return this.usersService.findOne(parseInt(id));
}
@Get('/users')
findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
}
@Delete('/users/:id')
remove(@Param('id') id:string){
    return this.usersService.remove(parseInt(id));
}
@Patch('/users/:id')
async updateUser(@Param('id') id:string,@Body() body: UpdateUserDto){
return this.usersService.update(parseInt(id),body);
}
}
