import { BeforeInsert, BeforeRemove, BeforeUpdate, JoinColumn, JoinTable, ManyToOne, OneToMany } from "typeorm"; 
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.entity";
import { Comment } from "../comments/Entity/comment.entity";
@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    publishDate: Date;

    @OneToMany(() => Comment, comment => comment.post,{eager:true}) 
    comments: Comment[];

    @Column({ nullable: true })
    description: string;

    @ManyToOne(() => User, user => user.posts)
    @JoinColumn()
    user: User;


    @Column("simple-array")
    postImages: string[]

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