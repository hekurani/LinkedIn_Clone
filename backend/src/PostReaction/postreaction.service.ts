import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { postreaction } from './postreaction.entity';
import { Repository } from 'typeorm';
import { ReactionStatus } from './enums/reactionstatus.types';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class ReactionService {
  constructor(
    @InjectRepository(postreaction)
    private readonly reactionRepository: Repository<postreaction>,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}
  async createReaction(
    userId: number,
    postId: number,
    reactionStatus: ReactionStatus,
  ) {
    const user = await this.usersService.findOne(userId);
    const post = await this.postsService.findOne(postId);

    if (!user) throw new NotFoundException('No user found!');
    if (!post) throw new NotFoundException('No post was found with that id!');
    const postReaction = await this.reactionRepository.find({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    if (postReaction.length)
      throw new ForbiddenException('The object already exists!');
    const reactionPost = this.reactionRepository.create({
      user,
      reactionType: reactionStatus,
      post,
    });
    await this.reactionRepository.save(reactionPost);
    return reactionPost;
  }

  async deleteReaction(userId: number, postId: number) {
    const postReaction = await this.reactionRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    if (!postReaction)
      throw new NotFoundException('The post or user doesnt exists!');

    await this.reactionRepository.delete(postReaction.id);
    return {
      status: 'success',
    };
  }
  async updateReaction(userId: number, postId: number, reactionStatus: string) {
    await this.reactionRepository.update(
      { user: { id: userId }, post: { id: postId } },
      { reactionType: reactionStatus },
    );
    const postReaction = await this.reactionRepository.findOne({
      where: { user: { id: userId }, post: { id: postId } },
    });
    if (!postReaction)
      throw new NotFoundException('The post or user doesnt exists!');
    return {
      status: 'success',
      postReaction,
    };
  }
}
