import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>; // Include userRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Use getRepositoryToken to get Repository token
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User)); // Inject userRepository
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });
});
