import { BeforeInsert,BeforeRemove,BeforeUpdate,ManyToOne, OneToMany } from "typeorm"; //importojm hooks qe na ndihmojn me vone
import { Entity,Column,PrimaryGeneratedColumn } from "typeorm"; //primarygeneratedcolumn eshte qe e definon AI(AuotaIncrement) per id ne rastin tone
import { User } from "../users/user.entity";
import { Comment } from "../comments/Entity/comment.entity";
@Entity()
export class Posts {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
   publishDate: Date;

   @OneToMany(() => Comment, comment => comment.post)  // Establish one-to-many relationship with Comment entity
   comments: Comment[];

    @Column({nullable:true})
    description:string;
    
    @ManyToOne(() => User, user => user.posts)
  user: User;
  @Column("simple-array")
  postImages: string[]

@BeforeRemove() //para se me fshi na tregon cili post id eshte duhke u fshi
beforeRemove(){
    console.log(`The removed post id is ${this.id}`);
}

@BeforeUpdate()//e njejta tash per update
beforeUpdate(){
    console.log(`The updated post id is ${this.id}` );
}
    
@BeforeInsert()//para se me insertu nje post te ri id na shfaqet me mesazhin peraktes
beforeInsert(){
    console.log(`The new post id is ${this.id}`);
}
}