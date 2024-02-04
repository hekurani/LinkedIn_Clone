import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity({ name: 'friends' })
export class Friend {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    sender: User;

    @OneToOne(() => User, { createForeignKeyConstraints: false })
    @JoinColumn()
    receiver: User;
    
@Column({default:Date.now()})
createdAt:Date;

}