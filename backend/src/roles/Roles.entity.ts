import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./types/role.type";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        unique:true
    })
    role: UserRole;

    @Column()
    description:string;
}