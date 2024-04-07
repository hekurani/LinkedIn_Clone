import { Injectable } from '@nestjs/common';
import { Role } from './Roles.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from './types/role.type';
@Injectable()
export class RolesService {
constructor(@InjectRepository(Role) private rolesRepository: Repository<Role>){}
   async createRole(role:UserRole,description:string){
        const createdRole=await this.rolesRepository.create({  role,description })
        const savedRole=await this.rolesRepository.save(createdRole)
        return {
            status:'success',
            savedRole
        }
    }
    findRole(role:UserRole){
       return this.rolesRepository.findOne({where:{role}}); 
    }
    

}
