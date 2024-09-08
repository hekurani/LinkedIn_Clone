import {
  UseInterceptors,
  ClassSerializerInterceptor,
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Query,
  Delete,
  SetMetadata,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { Session, UploadedFile } from '@nestjs/common/decorators';
import { CurrentUser } from './Decorators/current-user.decorator';
import { Posts } from '../posts/post.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Public } from 'src/auth/decorators/Public-Api.decorator';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { Skill } from 'src/skills/skills.entity';
import { PaginationDto } from 'src/pagination/pagination.dto';

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};
const storage = diskStorage({
  destination: '../',
  filename: (req, file, cb) => {
    const name = file.originalname.split('.')[0];
    const extension = extname(file.originalname);
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    cb(null, `/Images/${name}-${randomName}${extension}`);
  },
});

@Controller('/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/profile')
  async getMe(@CurrentUser() user: User) {
    return user;
  }

  @Post('/logout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/add-skill')
  async addSkillToUser(
    @AuthUser() user: { userId: number },
    @Query('skillId') skillId: string[],
  ) {
    let skillIds: number[] = [];
    if (Array.isArray(skillId)) {
      skillIds = skillId.map((id) => +id);
    } else {
      skillIds = [+skillId];
    }
    return this.usersService.addSkillToUser(user?.userId, skillIds);
  }

  @Get('/:id/skills')
  async getUserSkills(@AuthUser() user: { userId: number }): Promise<Skill[]> {
    return this.usersService.getUserSkills(user?.userId);
  }

  @Get('/:id/posts')
  async getUserPosts(@Param('id') userId: string): Promise<Posts[]> {
    const posts = await this.usersService.getUserPosts(parseInt(userId));
    return posts;
  }
  @Public()
  @Get('/users/:id')
  findUser(@Param('id') id: string) {
    if (!id) {
      return null;
    }
    return this.usersService.findOne(parseInt(id));
  }
  @Delete('/users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Public()
  @Patch('/users/:id')
  @UseInterceptors(
    FileInterceptor('image', { storage, fileFilter: imageFileFilter }),
  )
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    body.imageProfile = file?.filename;
    return this.usersService.update(parseInt(id), body);
  }

  @Get()
  getUSers(
    @AuthUser() user: { userId: number },
    @Query() paginationDto: PaginationDto,
  ) {
    const { page = 1, limit = 10 } = paginationDto;
    const pagination = { page, limit };
    return this.usersService.getUsers(user.userId, pagination);
  }
}
