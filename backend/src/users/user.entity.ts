import { Exclude } from 'class-transformer';
import { ArrayNotEmpty } from 'class-validator';
import { postreaction } from 'src/PostReaction/postreaction.entity';
import { commentreaction } from 'src/comment-reaction/comment-reaction.entity';
import { company } from 'src/company/company.entity';
import { Profession } from 'src/profession/profession.entity';
import { Reposts } from 'src/reposts/reposts.entity';
import { Role } from 'src/role/entities/role.entity';
import { Skill } from 'src/skills/skills.entity';
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Comment } from '../comments/Entity/comment.entity';
import { Posts } from '../posts/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: 0 })
  countUnseenConnections: number;

  @OneToMany(() => postreaction, (postreaction) => postreaction.user)
  likes: postreaction[];

  @OneToMany(() => commentreaction, (commentreaction) => commentreaction.user)
  commentReaction: commentreaction[];

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column()
  roleId: number;

  @Exclude()
  @Column({ nullable: true, select: false })
  password: string;

  @ManyToMany(() => Skill, { eager: true })
  @JoinTable()
  skills: Skill[];

  @Exclude()
  @Column({ nullable: true, select: false })
  RefreshToken: string;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column({ nullable: true })
  imageProfile: string;

  @Column({ nullable: true })
  gender: string;


  @OneToMany(() => Reposts, (reposts) => reposts.user)
  reposts: Reposts[];

  @ManyToOne(() => Profession, { nullable: true })
  @JoinColumn({ name: 'professionId' })
  profession: Profession;

  @Column({ nullable: true })
  professionId: number;

  @BeforeRemove()
  beforeRemove() {
    console.log(`The removed user id is ${this?.id}`);
  }

  @BeforeUpdate()
  beforeUpdate() {
    console.log(`The updated user id is ${this?.id}`);
  }

  @BeforeInsert()
  beforeInsert() {
    console.log(`The new user id is ${this?.id}`);
  }
}
