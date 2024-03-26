import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, OneToOne } from "typeorm";
import {User} from "../../users/user.entity";
import {ChatRoom} from "../../chatroom/chat.entity";
import { Comment } from "./comment.entity";

@Entity()
export class EditedComment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    editedAt:Date;
    
    @OneToOne(()=>Comment,(comment)=>comment.editedcomment)
    coment:Comment;
    
}