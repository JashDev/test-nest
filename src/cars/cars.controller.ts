import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { Workbook } from 'exceljs';
import * as tmp from 'tmp';
import { Readable } from 'stream';
import { Buffer } from 'buffer';
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

  @Get('test/:name')
  async test(@Param('name') name: string, @Res() res) {
    const data = [
      {
        name: 'John',
      },
      {
        name: 'Jane',
      },
    ];

    const rows = [];

    data.forEach((item) => {
      rows.push([item.name]);
    });

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');
    worksheet.columns = [{ header: 'Name', key: 'name', width: 30 }];
    worksheet.addRows(rows);
    const buffer = await workbook.xlsx.writeBuffer();

    return res.send(buffer);
  }
}
