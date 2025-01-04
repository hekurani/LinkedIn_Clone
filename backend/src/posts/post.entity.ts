import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Comment } from '../comments/Entity/comment.entity';
import { postreaction } from 'src/PostReaction/postreaction.entity';
import { Reposts } from 'src/reposts/reposts.entity';
@Entity()
export class Posts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  publishDate: Date;

  @OneToMany(() => Comment, (comment) => comment.post, { eager: true })
  comments: Comment[];

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  @JoinColumn()
  user: User;

  @OneToMany(() => Reposts, (reposts) => reposts.posts)
  reposts: Reposts[];

  @Column('simple-array')
  postImages: string[];

  @OneToMany(() => postreaction, (postreaction) => postreaction.post)
  @JoinColumn()
  likes: postreaction[];

  @BeforeRemove()
  beforeRemove() {
    console.log(`The removed post id is ${this.id}`);
  }

  @BeforeUpdate()
  beforeUpdate() {
    console.log(`The updated post id is ${this.id}`);
  }

  @BeforeInsert()
  beforeInsert() {
    console.log(`The new post id is ${this.id}`);
  }
}
