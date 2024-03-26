import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn, OneToOne } from "typeorm";
import {User} from "../../users/user.entity";
import {ChatRoom} from "../../chatroom/chat.entity";
import { Message } from "./message.entity";
@Entity()
export class DeletedMessage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    deletedAt:Date;

    @OneToOne(()=>Message,(message)=>message.deletedmessage)
    message:Message;

    
}