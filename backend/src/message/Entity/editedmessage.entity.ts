import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, OneToOne } from "typeorm";
import {User} from "../../users/user.entity";
import {ChatRoom} from "../../chatroom/chat.entity";
import { Message } from "./message.entity";

@Entity()
export class EditedMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    editedAt:Date;
    
    @OneToOne(()=>Message,(message)=>message.editedmessage)
    message:Message;


    
}