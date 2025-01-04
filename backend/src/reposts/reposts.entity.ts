import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '@nestjs/common';
import { Posts } from 'src/posts/post.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Reposts {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.reposts)
  @JoinColumn()
  @JoinTable()
  user: User;

  @OneToOne(() => Posts, (post) => post.reposts)
  @JoinColumn()
  @JoinTable()
  posts: Posts;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;
}
