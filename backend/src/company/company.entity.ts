import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IndustryType } from './enum/industry_type.enum';
import { IsNotEmpty } from 'class-validator';
import { WorkPlace } from './enum/workplace.enum';
import { city } from 'src/location/entity/city.entity';
@Entity()
export class company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: String;

  @Column({ nullable: false, unique: true })
  slug: String;

  // @Column({ nullable: false, unique: true })
  // email: String;
  
  @Column({
    type: 'enum',
    enum: IndustryType,
    nullable: false,
  })
  industry_type: IndustryType;

  @Column('simple-array', { nullable: true })
  Specalities: String[];

  @Column({ nullable: true })
  tagLine: String; // add additional information about services of company
  @ManyToOne(() => city, { cascade: true })
  @JoinColumn()
  cityId: city;

  @Column({ default: 'logo.png' })
  logo: string;

  @Column({ default: 'imageCover.png' })
  imageCover: string;

  @ManyToOne(() => User, (user) => user.companies, {
    eager: true,
    cascade: true,
  })
  owner: User;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ nullable: false })
  yearFounded: String;

  @Column({
    type: 'enum',
    enum: WorkPlace,
    nullable: true,
  })
  workPlace: WorkPlace;

  @Column('simple-array', {
    nullable: true,
  })
  hashTags: String[];

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;
}
