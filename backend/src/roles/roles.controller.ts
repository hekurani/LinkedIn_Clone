import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/createRole.dto';

@Controller('roles')
export class RolesController {
constructor(private rolesService:RolesService){}
    @Post()
    createRole(@Body() createRole:CreateRoleDto){
      return this.rolesService.createRole(createRole.role,createRole.description);
    }
   
}
