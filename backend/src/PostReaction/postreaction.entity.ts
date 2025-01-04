import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';

@Entity({ name: 'postreaction' })
export class postreaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.likes)
  @JoinColumn()
  user: User;

  @ManyToOne(() => Posts, (posts) => posts.likes)
  @JoinColumn()
  post: Posts;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
  })
  reactionType: string;
}
