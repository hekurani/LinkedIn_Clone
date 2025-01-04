import { User } from 'src/users/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FriendStatus } from './type/friend-request.type';

@Entity()
export class FriendRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn()
  sender: User;

  @OneToOne(() => User, { eager: true, createForeignKeyConstraints: false })
  @JoinColumn()
  receiver: User;

  @CreateDateColumn({ type: 'date', default: () => 'CURRENT_DATE' })
  createdAt: Date;

  @Column()
  status: FriendStatus;
}
