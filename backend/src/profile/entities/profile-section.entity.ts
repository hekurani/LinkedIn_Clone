import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
 export enum Priority{
    CORE = "core",
    RECOMMENDED = "recommended",
    ADDITIONAL = "additional"
 }
@Entity()
export class ProfileSection {
@PrimaryGeneratedColumn()
id: number;


@Column()
name: string;

@Column({
    type: "enum",
    enum: Priority,
    default:Priority.ADDITIONAL
})
priority: string;
}

