import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Entity/comment.entity';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';
@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private repo: Repository<Comment>,
    @InjectRepository(Posts) private postRepository: Repository<Posts>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(text: string, userId: number, postId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['comments'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.repo.create({
      text,
      user,
      post,
      publishDate: new Date(),
    });
    const savedComment = await this.repo.save(comment);

    post.comments = post.comments || [];

    post.comments = [...post.comments, savedComment];

    await this.postRepository.save(post);

    return {
      status: 'Success',
    };
  }

  async findOne(id: number) {
    if (!id) {
      return null;
    }
    let comment = await this.repo.findOne({
      where: { id: id },
      relations: ['user', 'post'],
    });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async findAll() {
    return this.repo.find({
      where: { childComments: null },
      relations: ['user', 'post', 'childComments', 'parentComment'],
    });
  }
  async createReply(reply: string, id: number, userId: number) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('There are no comment with this id!');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('You have to logIn to create an reply!');
    }

    const replyComment = this.repo.create({
      text: reply,
      parentComment: comment,
      post: comment.post,
      user: user,
    });
    const Comment = await this.repo.save(replyComment);
    console.log(Comment);
    return Comment;
  }

  async remove(id: number) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException(
        'The comment that you wanted to delete doesnt exist at all!',
      );
    }
    await this.repo.delete(id);
    return {
      status: 'success',
    };
  }

  async update(id: number, attrs: Partial<Comment>) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    await this.repo.update(id, attrs);
    return {
      status: 'success',
    };
  }
}
