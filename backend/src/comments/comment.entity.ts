import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

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
}