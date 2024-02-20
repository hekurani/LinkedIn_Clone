import { Entity, Column, PrimaryGeneratedColumn,ManyToOne, CreateDateColumn } from "typeorm";
import {User} from "../users/user.entity";
import {ChatRoom} from "../chatroom/chat.entity";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

   @Column({ default: () => 'CURRENT_TIMESTAMP' })
   publishDate: Date;

    @ManyToOne(() => User)
    user: User;
  
    @ManyToOne(() => ChatRoom)
    chat: ChatRoom;

    
}
