import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profession } from './profession.entity';

@Injectable()
export class ProfessionService {
    constructor(
        @InjectRepository(Profession)
        private professionRepository: Repository<Profession>,
    ) {}

    async findAll(): Promise<Profession[]> {
        return this.professionRepository.find();
    }

    async findOne(id: number): Promise<Profession> {
        return this.professionRepository.findOne({ where: { id } });
    }

    async create(name: string): Promise<Profession> {
        const profession = this.professionRepository.create({ name });
        return this.professionRepository.save(profession);
    }

    async update(id: number, name: string): Promise<Profession> {
        await this.professionRepository.update(id, { name });
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.professionRepository.delete(id);
    }
} 