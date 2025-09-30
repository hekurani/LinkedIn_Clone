import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { city } from './entity/city.entity';
import { country } from './entity/country.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(country) private CountryRepository: Repository<country>,
    @InjectRepository(city) private CityRepository: Repository<city>,
  ) {}
  async createCountry(country: String) {
    const countryObject = this.CountryRepository.create({ country });
    const savedCountryObject = await this.CountryRepository.save(countryObject);
    return savedCountryObject;
  }
  async createCity(city: String, countryId: number) {
    const country = await this.CountryRepository.findOne({
      where: { id: countryId },
    });
    if (!country)
      throw new NotFoundException("There's no country valid with this id!");
    const cityObject = this.CityRepository.create({ city, country });
    const savedCity = this.CityRepository.save(cityObject);
    return savedCity;
  }
  async getCountries() {
    return this.CountryRepository.find();
  }

  async getCities() {
    return this.CityRepository.find();
  }
  
  async getCitiesByCountry(id: number) {
    const country = this.CountryRepository.findOne({ where: { id } });
    if (!country)
      throw new NotFoundException("There's no country valid with this id!");
    const cities = await this.CityRepository.find({
      where: { country: { id } },
    });
    return cities;
  }
  async getCity(id: number) {
    const City = await this.CityRepository.findOne({ where: { id } });
    return City;
  }
  async getCountry(id: number) {
    const country = await this.CountryRepository.findOne({ where: { id } });
    return country;
  }
}
