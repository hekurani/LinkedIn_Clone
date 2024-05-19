import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany } from 'typeorm';
import { User } from '../../users/user.entity';
import { Posts } from 'src/posts/post.entity';
import { commentreaction } from 'src/comment-reaction/comment-reaction.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    publishDate: Date;

    @ManyToOne(() => User, user => user.comments,{eager:true})
    user: User;

@OneToMany(()=>commentreaction,commentReaction=>commentReaction.comment)
commentReactions:commentreaction[]

    @ManyToOne(() => Posts, post => post.comments)
    post: Posts;

    @OneToMany(() => Comment, comment => comment.parentComment,{lazy:true})
    childComments: Comment[];

    @ManyToOne(() => Comment, comment => comment.childComments, { onDelete: 'CASCADE',onUpdate:'CASCADE',lazy:true })
    parentComment: Comment;

    @Column({onUpdate:'CURRENT_TIMESTAMP',nullable:true})
    updatedAt:Date;
}