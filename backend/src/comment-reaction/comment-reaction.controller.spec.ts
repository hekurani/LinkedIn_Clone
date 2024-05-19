import { Test, TestingModule } from '@nestjs/testing';
import { CommentReactionController } from './comment-reaction.controller';

describe('CommentReactionController', () => {
  let controller: CommentReactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentReactionController],
    }).compile();

    controller = module.get<CommentReactionController>(CommentReactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
