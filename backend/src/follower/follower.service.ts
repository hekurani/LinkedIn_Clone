import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Follower } from './follower.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { company } from 'src/company/company.entity';
import { NotFoundError } from 'rxjs';
import { User } from 'src/users/user.entity';

@Injectable()
export class FollowerService {
  constructor(
    @InjectRepository(Follower)
    private readonly FollowerRepository: Repository<Follower>,
    @InjectRepository(company)
    private readonly CompanyRepository: Repository<company>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async sendFollow(companyId: number, userId: number) {
    const company = await this.CompanyRepository.findOne({
      where: { id: companyId },
    });
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const existantFollower = await this.FollowerRepository.find({
      where: { follower: { id: user.id }, company: { id: company.id } },
    });
    if (existantFollower.length)
      throw new BadRequestException('You are already following this company!');
    if (!company)
      throw new NotFoundException("There's no company ith that id!");
    if (!user)
      throw new NotFoundException(
        'You cant send an follow request while you are logged out!',
      );

    const follower = this.FollowerRepository.create({
      company,
      follower: user,
    });
    const savedFollower = await this.FollowerRepository.save(follower);
    return savedFollower;
  }
  async getFollowers(companyId: number) {
    const company = await this.CompanyRepository.findOne({
      where: { id: companyId },
    });
    if (!company)
      throw new NotFoundException("There's no company ith that id!");
    const followers = await this.FollowerRepository.find({
      where: { company: { id: company.id } },
    });
    return {
      status: 'success',
      companyFollowers: followers,
    };
  }
  async unFollow(id: number) {
    const follower = await this.FollowerRepository.findOne({ where: { id } });
    if (!follower)
      throw new NotFoundException("There's no followe with that id!");
    await this.FollowerRepository.remove(follower);
    return { status: 'success' };
  }
}
