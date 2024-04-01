import { BeforeInsert,BeforeRemove,BeforeUpdate, JoinColumn, JoinTable, ManyToMany, Unique } from "typeorm";
import { Entity,Column,PrimaryGeneratedColumn,OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Posts } from "../posts/post.entity";
import { Comment } from "../comments/Entity/comment.entity";
import { Skill } from "src/skills/skills.entity";
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
    @Column({nullable:true,select:false})
    password:string;

    @ManyToMany(()=>Skill,{eager:true})
    @JoinTable()
    skills: Skill[]; 

    @Exclude()
    @Column({nullable:true,select:false})
    RefreshToken:string;

    @OneToMany(() => Posts, post => post.user)
    posts: Posts[];
    
    @OneToMany(() => Comment, comment => comment.user) 
    comments: Comment[]; 

    @Column({nullable:true,default:'profile.png'})
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