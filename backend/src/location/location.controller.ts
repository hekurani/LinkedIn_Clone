import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/AuthUser-decorator';
import { CreateCityDto } from './dto/CreateCity.dto';
import { CreateCountryDto } from './dto/CreateCountry.dto';
import { LocationService } from './location.service';
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

    @Get('/city')
  getCities() {
    return this.locationService.getCities();
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
