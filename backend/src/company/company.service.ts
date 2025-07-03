import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { company } from './company.entity';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { NotFoundError } from 'rxjs';
import { randomBytes, scrypt as _scrypt } from 'crypto';

import { IndustryType } from './enum/industry_type.enum';
import { WorkPlace } from './enum/workplace.enum';
import { city } from 'src/location/entity/city.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';
import { promisify } from 'util';
import { UpdateCommentDto } from 'src/comments/dto/update.dto.entity';
import { UpdateCommpanyDto } from './dto/UpdateCompany.dto';
import { CreateCommpanyDto } from './dto/CreateCompany.dto';
const scrypt = promisify(_scrypt);

@Injectable()
export class CompanyService {
  async updateCompany(id: number, updateCompany: UpdateCommpanyDto) {
    let company = await this.companyRepository.findOne({ where: { id } });
    let city;
    if (!company) {
      throw new NotFoundException('Company not found');
    }

    company = { ...company, ...updateCompany, cityId: company.cityId };

    if (updateCompany?.cityId) {
      city = await this.cityRepository.findOne({
        where: { id: parseInt(updateCompany.cityId) },
      });
      company = { ...company, ...updateCompany, cityId: city };
    }

    const savedCompany = await this.companyRepository.save(company);
    return savedCompany;
  }

  constructor(
    private readonly userService: UsersService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(city) private cityRepository: Repository<city>,
    @InjectRepository(company)
    private readonly companyRepository: Repository<company>,
  ) { }
  async createCompany(createCompanyDto: CreateCommpanyDto, userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const city = await this.cityRepository.findOne({
      where: { id: parseInt(createCompanyDto.cityId) },
    });
    if (!user) throw new NotFoundException('No user exist!');
    if (!city) throw new NotFoundException('No city with given id exist!');
    const company = this.companyRepository.create({
      ...createCompanyDto,
      cityId: city,
      owner: user,
    });

    const savedCompany = await this.companyRepository.save(company);
    return savedCompany;
  }

  async getUser(email: string, password: string): Promise<User> {
    const [user] = await this.userService.findByPassword(email, false);
    if (!user || !user?.password) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user?.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong password!');
    }
    return user;
  }
  async getCompany(slug: string) {
    const company = await this.companyRepository.findOne({ where: { slug } });
    return company;
  }
  async deleteCompany(
    id: number,
    email: string,
    password: string,
    userId: number,
  ) {
    const user = this.getUser(email, password);
    if ((await user).id !== userId)
      throw new BadRequestException(
        'You havent entered right creditials, please try again!',
      );

    const company = await this.companyRepository.findOne({
      where: { id, owner: await user },
    });

    if (!company) {
      throw new NotFoundException(
        'Company not found or you do not have permission to delete it',
      );
    }

    await this.companyRepository.remove(company);
    return { message: 'Company deleted successfully' };
  }
  async getCompanies() {
    return await this.companyRepository.find();
  }

  async getCompanyByEmail(email: string): Promise<company> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    const company = await this.companyRepository.findOne({
      where: { email },
    });

    if (!company) {
      throw new NotFoundException('Company not found with the given email');
    }

    return company;
  }
}
