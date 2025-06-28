import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { Profession } from './profession.entity';

@Controller('professions')
export class ProfessionController {
    constructor(private readonly professionService: ProfessionService) {}

    @Get()
    findAll(): Promise<Profession[]> {
        return this.professionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Profession> {
        return this.professionService.findOne(+id);
    }

    @Post()
    create(@Body('name') name: string): Promise<Profession> {
        return this.professionService.create(name);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body('name') name: string,
    ): Promise<Profession> {
        return this.professionService.update(+id, name);
    }

    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.professionService.remove(+id);
    }
} 