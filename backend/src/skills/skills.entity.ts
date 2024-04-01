import { User } from "src/users/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn, ManyToMany } from "typeorm";

@Entity()
export class Skill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique:true})
    name: string;

}
