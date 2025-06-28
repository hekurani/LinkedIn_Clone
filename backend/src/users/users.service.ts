import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Brackets, ILike, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Posts } from '../posts/post.entity';
import { randomBytes, scrypt as _scrypt } from 'crypto';

import { FindManyOptions } from 'typeorm';
import { promisify } from 'util';
import { Skill } from 'src/skills/skills.entity';
import { Role } from 'src/role/entities/role.entity';
import { PaginationDto } from 'src/pagination/pagination.dto';
const scrypt = promisify(_scrypt);
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repo: Repository<User>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(Skill) private skillRepository: Repository<Skill>,
  ) {}

  async create(
    name: string,
    lastname: string,
    email: string,
    password: string,
    imageProfile: string,
    role: Role,
  ) {
    const user = this.repo.create({
      name,
      lastname,
      email,
      password,
      imageProfile,
      roleId: role.id,
    });
  
    const savedUser = await this.repo.save(user);
  
    return {
      ...savedUser,
      role: role?.name,
    };
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }

    const user = await this.repo.findOne({
      where: { id },
      select: [
        'id',
        'email',
        'imageProfile',
        'name',
        'lastname',
        'RefreshToken',
        'countUnseenConnections',
        'roleId',
      ],
      relations: ['role', 'profession'],
    });
    

    return user ?? null;
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(
        'The user that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(user);
  }

  findAll() {
    return this.repo.find();
  }
  findByPassword(email: string, isPasswordNull: Boolean) {
    if (isPasswordNull) {
      return this.repo.find({
        where: { email, password: null },
        select: [
          'id',
          'name',
          'lastname',
          'email',
          'gender',
          'imageProfile',
          'password',
          'roleId',
        ],
        relations: ['role'],
      });
    }
    return this.repo.find({
      where: { email },
      select: [
        'id',
        'name',
        'lastname',
        'email',
        'gender',
        'imageProfile',
        'password',
        'roleId',
      ],
      relations: ['role'],
    });
  }
  find(email: string) {
    return this.repo.find({ where: { email } });
  }
  async addSkillToUser(userId: number, skillsId: number[]) {
    //,metod qe na mudeson te shtojm nje skil per nje user
    const user = await this.repo.findOne({
      where: { id: userId },
      relations: ['skills'],
    }); //gjejm userin

    if (!user) {
      //nese nuk vjen
      throw new NotFoundException('User not found'); //vendosim not found exception
    }

    const skills = await Promise.all(
      skillsId.map(async (id) => {
        const skill = await this.skillRepository.findOne({ where: { id } });

        if (!skill) {
          throw new NotFoundException("Skill with given id doesn't exist!");
        }
        if (
          (await this.repo.find({ where: { id: user.id, skills: { id } } }))
            .length
        ) {
          throw new ForbiddenException('Skill already exists for this user!');
        }
        return skill;
      }),
    );
    user.skills = skills;
    // return this.repo.save(user);

    return {
      status: 'success',
      user,
    };
  }

  async getUserSkills(userId: number): Promise<Skill[]> {
    //metod per mi marr krejt skills te userit
    const user = await this.findOne(userId); //e gjem
    if (!user) {
      //nese nuk e gjejm
      throw new NotFoundException('User not found'); //not found excp
    }

    return user.skills; // Return the user's skills ose null
  }

  async update(id: number, attrs: Partial<User>, refreshToken?: string) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    //passwordi qe na ka ardh nese na ka ardh e hashum
    if (attrs.password) {
      const salt = randomBytes(8).toString('hex');
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;
      attrs.password = salt + '.' + hash.toString('hex');
    }

    // Handle RefreshToken
    if (refreshToken) {
      user.RefreshToken = refreshToken;
    }
    const updatedUser = this.repo.merge(user, attrs);
    return this.repo.save(updatedUser);
  }

  async getUserPosts(user_id: number): Promise<Posts[]> {
    const user = await this.repo.findOne({ where: { id: user_id } });
    if (!user) {
      return [];
    }

    const options: FindManyOptions<Posts> = {
      where: {
        user: { id: user.id },
      },
    };

    return this.postRepository.find(options);
  }
  async getUsers(userId: number, pagination: PaginationDto, search?: string) {
    const { page, limit } = pagination;
   
    const options: FindManyOptions<User> = {
      where: [
        {
          id: Not(userId),
          ...(search && {
            name: ILike(`%${search}%`),
          }),
        },
        {
          id: Not(userId),
          ...(search && {
            lastname: ILike(`%${search}%`),
          }),
        },
      ],
      relations: ['role'],
      skip: (page - 1) * limit,
      take: limit,
    };
    const users = await this.repo.find(options);

    const totalCount = await this.repo.count({
      where: [
        {
          id: Not(userId),
          ...(search && {
            name: ILike(`%${search}%`),
          }),
        },
        {
          id: Not(userId),
          ...(search && {
            lastname: ILike(`%${search}%`),
          }),
        },
      ],
    });

    return { users, totalCount };
  }
}
