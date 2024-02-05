import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    publishDate: Date;

    @ManyToOne(() => User, user => user.comments)
    
    user: User;

    @ManyToOne(() => Posts, post => post.comments)
    post: Posts;
}