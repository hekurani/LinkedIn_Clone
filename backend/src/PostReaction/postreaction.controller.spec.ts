import { Test, TestingModule } from '@nestjs/testing';
import { LikesController } from './postreaction.controller';

describe('LikesController', () => {
  let controller: LikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LikesController],
    }).compile();

    controller = module.get<LikesController>(LikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
