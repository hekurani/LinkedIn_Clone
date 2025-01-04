import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCountryDto } from './dto/CreateCountry.dto';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { LocationService } from './location.service';
import { CreateCityDto } from './dto/CreateCity.dto';
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
  @Post('/country')
  createCountry(@Body() createCountry: CreateCountryDto) {
    return this.locationService.createCountry(createCountry.country);
  }
  @Post('/city')
  createCity(@Body() createCity: CreateCityDto) {
    return this.locationService.createCity(
      createCity.city,
      createCity.countryId,
    );
  }
  @Get('/country')
  getCountries() {
    return this.locationService.getCountries();
  }

  @Get('/country/:id/city')
  getCitiesByCountry(@Param('id') id: number) {
    return this.locationService.getCitiesByCountry(id);
  }

  @Get('/city/:id')
  getCity(@Param('id') id: number) {
    return this.locationService.getCity(id);
  }

  @Get('/country/:id')
  getCountry(@Param('id') id: number) {
    return this.locationService.getCountry(id);
  }
}
