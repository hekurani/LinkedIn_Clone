import { BeforeInsert,BeforeRemove,BeforeUpdate, Unique } from "typeorm";
import { Entity,Column,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Posts } from "../posts/post.entity";
import { Comment } from "../comments/Entity/comment.entity";
export enum UserRole {
    ADMIN = "admin",
    JOBSEEKER = "jobseeker"
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    lastname:string;

    @Column()
    email:string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.JOBSEEKER
    })
    role: UserRole
    
    @Exclude()
    @Column({nullable:true})
    password:string;

    @Column("simple-array", { default: [] }) // deefault e ka vleren nje array boshe
    skills: number[]; // Array qe na ndihmone te ruajm skillsId's per user

    @Column({nullable:true})
    RefreshToken:string;

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
    
    @OneToMany(() => Comment, comment => comment.user) 
    comments: Comment[]; 

    @Column({nullable:true})
    imageProfile:string;

    @Column({nullable:true})
    gender:String;
@BeforeRemove()
beforeRemove(){
    console.log(`The removed user id is ${this.id}`);
}

@BeforeUpdate()
beforeUpdate(){
    console.log(`The updated user id is ${this.id}` );
}
    
@BeforeInsert()
beforeInsert(){
    console.log(`The new user id is ${this.id}`);
}
}