import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './Entity/comment.entity';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';
import { EditedComment } from './Entity/editedcomment.entity';
@Injectable()
export class CommentsService {
  constructor(@InjectRepository(Comment) private repo: Repository<Comment>,@InjectRepository(Posts) private postRepository: Repository<Posts>,@InjectRepository(User) private userRepository: Repository<User>,@InjectRepository(EditedComment) private editedCommentRepository: Repository<EditedComment>) {}

  async create(text: string, userId: number, postId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({ where: { id: postId }, relations: ['comments'] });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!post) {
      throw new NotFoundException('Post not found');
    }
  
    const comment = this.repo.create({ text, user, post, publishDate: new Date() });
    const savedComment = await this.repo.save(comment);
  
    //check nese e inicializume si array
    post.comments = post.comments || [];
    
    //saved comment e shtojme ne array
    post.comments = [...post.comments, savedComment];
  
    // e save postin
    await this.postRepository.save(post);
  
    return 'Comment created successfully';
  }
  
async findOne(id: number) {
    if (!id) {
        return null;
    }
    let comment = await this.repo.findOne({ where: { id: id }, relations: ['user', 'post'] });
    if (!comment) {
        throw new NotFoundException('Comment not found');
    }
    return comment;
}

async findAll() {
    return this.repo.find({ relations: ['user', 'post'] });
}

 

  async remove(id: number) {
    const comment = await this.repo.findOne({where:{id}});
    if (!comment) {
      throw new NotFoundException(
        'The comment that you wanted to delete doesnt exist at all!',
      );
    }
    return this.repo.remove(comment);
  }

 

async update(id: number, attrs: Partial<Comment>) {
    const comment = await this.repo.findOne({ where: { id } });
    if (!comment) {
        throw new NotFoundException('Comment not found');
    }
const editedComment= this.editedCommentRepository.create({coment:comment});
this.editedCommentRepository.save(editedComment);
    await this.repo.update(id, attrs);
    return "Updated comment successfully!";
}
} 