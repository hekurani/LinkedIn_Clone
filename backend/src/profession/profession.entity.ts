import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Profession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;
} 