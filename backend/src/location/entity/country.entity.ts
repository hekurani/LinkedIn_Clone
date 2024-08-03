import { minLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class country {
    @PrimaryGeneratedColumn()
    id: number;
     
    @Column({unique:true})
    country:String;

}