import { jobPost } from "src/job-post/job-post.entity";
import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

    @ManyToOne(()=>jobPost,(jobPosts)=>jobPosts.skills,{createForeignKeyConstraints:false})
    jobPosts:jobPost

}
