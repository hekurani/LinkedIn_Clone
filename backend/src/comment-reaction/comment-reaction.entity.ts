import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Posts } from 'src/posts/post.entity';
import { Comment } from 'src/comments/Entity/comment.entity';
import { ReactionStatus } from './enums/reactionstatus.enums';
@Entity({ name: 'comment-reaction' })
export class commentreaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User,user=>user.commentReaction )
    @JoinColumn()
    user: User;

    @ManyToOne(() => Comment, comment => comment.commentReactions)
    @JoinColumn()
    comment: Comment;
    
    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt:Date;
    
    @Column({ type: 'enum', enum: ReactionStatus })
    reactionType: string;
}