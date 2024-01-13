import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("simple-array",{ default: [] }) // deefault e ka vleren nje array boshe
    messages: number[];
}


