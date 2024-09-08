import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { company } from 'src/company/company.entity';
import { Skill } from 'src/skills/skills.entity';
import { WorkType } from './enum/WorkPlace.enum';
import { city } from 'src/location/entity/city.entity';

@Entity({ name: 'job-post' })
export class jobPost {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => company, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    company: company;

    @OneToOne(() => User, {eager:true, createForeignKeyConstraints: false })
    @JoinColumn()
    supervisor: User;
    @Column()
    role:string;
    @Column({nullable:false})
    description:string;

    @Column({nullable:true})
    minSalary:number;

    @Column({nullable:true})
    maxSalary:number;

    @Column({nullable:true})
    redirectURL:string;
    
    @OneToMany(()=>Skill,(skill)=>skill.jobPosts,{eager:true,createForeignKeyConstraints: false})
    skills:Skill[];

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
    createdAt:Date;
    
    @ManyToOne(()=>city,{cascade:true})
    @JoinColumn()
    location:city;
    
    @Column({
        type: 'enum',
        enum: WorkType,
        nullable: true,
    })
    workPlace:WorkType

    @CreateDateColumn({ type: 'date', nullable:false})
    deadLine:Date;
}