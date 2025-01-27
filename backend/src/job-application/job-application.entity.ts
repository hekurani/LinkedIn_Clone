import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { company } from 'src/company/company.entity';
import { jobPost } from 'src/job-post/job-post.entity';

@Entity({ name: 'jobapplication' })
export class JobApplication {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn()
  applicant: User;

  @ManyToOne(() => jobPost, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn()
  jobPost: jobPost;

  @Column({ nullable: false })
  aplication: string;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;
}
