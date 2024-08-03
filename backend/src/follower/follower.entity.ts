
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { company } from 'src/company/company.entity';
@Entity({ name: 'Follower' })
export class Follower {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => company, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    company:company;

    @OneToOne(() => User, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    follower: User;
    
    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
createdAt:Date;

}