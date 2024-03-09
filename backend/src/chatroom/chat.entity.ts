import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn,ManyToOne,JoinColumn } from "typeorm";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-array",{ default: [] }) // deefault e ka vleren nje array boshe
    messages: number[];

    @ManyToOne(type => User)
    @JoinColumn()
    user1: User;

    @ManyToOne(type => User)
    @JoinColumn()
    user2: User;
}


