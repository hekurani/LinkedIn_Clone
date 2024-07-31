import {Expose} from 'class-transformer'

export class UserDto {
    @Expose()
    id: number;
    @Expose()
    email:string;
    @Expose()
    name:string;
    @Expose()
    lastname:string;
    @Expose()
    countUnseenConnections:number;
    @Expose()
    imageProfile:string;
      
}