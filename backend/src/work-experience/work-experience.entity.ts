import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { company } from 'src/company/company.entity';
import { WorkRole } from './enum/WorkRole.enum';
import { IsEnum } from 'class-validator';

@Entity({ name: 'WorkExperience' })
export class WorkExperience {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => company, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    company: company;

    @OneToOne(() => User, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    employer: User;

    @IsEnum(WorkRole)
    workRole:WorkRole

    @CreateDateColumn({ type: 'date', nullable:false })
    startDate:Date;

    @CreateDateColumn({ type: 'date',nullable:true})
    endDate:Date;
}