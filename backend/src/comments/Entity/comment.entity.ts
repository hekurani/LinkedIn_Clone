import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../../users/user.entity';
import { Posts } from 'src/posts/post.entity';
import { EditedComment } from './editedcomment.entity';

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

    @OneToOne(()=>EditedComment,(editedcoment)=>editedcoment.coment)
    editedcomment:EditedComment

}