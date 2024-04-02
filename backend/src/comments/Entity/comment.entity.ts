import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../users/user.entity';
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

    @OneToMany(() => Comment, comment => comment.parentComment)
    childComments: Comment[];

    @ManyToOne(() => Comment, comment => comment.childComments)
    parentComment: Comment;

    @Column({onUpdate:'CURRENT_TIMESTAMP',nullable:true})
    updatedAt:Date;

}