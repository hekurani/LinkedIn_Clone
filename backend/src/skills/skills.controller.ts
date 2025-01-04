import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Injectable,
  Param,
  Delete,
} from '@nestjs/common';
import { SkillsDTO } from './dtos/skills.dto';
import { AuthentGuard } from '../auth/guards/auth.guard';
import { SkillsService } from './skills.service';
import { Public } from '../auth/decorators/Public-Api.decorator';
import { NotFoundException } from '@nestjs/common';

@Controller('skills')
export class SkillsController {
  constructor(private skillsService: SkillsService) {}
  @Post()
  createPost(@Body() SkillsDTO: SkillsDTO) {
    return this.skillsService.create(SkillsDTO.name);
  }
  @Get()
  findAllSkills() {
    return this.skillsService.findAll();
  }
  @Get('/:id')
  findSkill(@Param('id') id: string) {
    if (!id) {
      return null;
    }
    return this.skillsService.findOne(parseInt(id));
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.skillsService.remove(parseInt(id));
  }
}
