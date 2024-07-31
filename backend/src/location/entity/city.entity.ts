import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { country } from "./country.entity";

@Entity()
export class city {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    city:String;
     
    @ManyToOne(()=>country)
    country:country;

}