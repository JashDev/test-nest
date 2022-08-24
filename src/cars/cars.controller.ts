import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get('/:id')
  getCar(@Param('id', ParseUUIDPipe) id: string) {
    console.log(id, 'id');
    return this.carsService.findOne(id);
  }

  @Post()
  createCar(@Body() car: CreateCarDto) {
    return this.carsService.create(car);
  }

  @Put(':id')
  updateCar(@Param('id', ParseUUIDPipe) id: string, @Body() car: UpdateCarDto) {
    return this.carsService.update(id, car);
  }

  @Get('/test/:name')
  test(@Param('name') name: string) {
    return `Hello ${name}`;
  }
}
