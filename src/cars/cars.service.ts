import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './iterfaces/car.interface';
import { v4 } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  public cars: Car[] = [
    { id: v4(), brand: 'Toyota', model: 'Corolla' },
    { id: v4(), brand: 'Mercedes', model: 'MMM' },
    { id: v4(), brand: 'BMW', model: 'X5' },
    {
      id: v4(),
      brand: 'Honda',
      model: 'Civic',
    },
  ];

  findAll(): Car[] {
    return this.cars;
  }

  findOne(id: string): Car {
    const car = this.cars.find((car) => car.id === id);

    if (!car) throw new NotFoundException(`Car with ID ${id} not found`);

    return car;
  }

  create(car: CreateCarDto): Car {
    const { brand, model } = car;
    const newCar = { id: v4(), brand, model };
    this.cars = [...this.cars, newCar];
    return newCar;
  }

  update(id: string, car: UpdateCarDto): Car {
    const carToUpdate = this.findOne(id);

    if (car?.id !== id)
      throw new BadRequestException(`ID ${id} does not match`);

    const updatedCar = { ...carToUpdate, ...car, id };
    this.cars = this.cars.map((car) => (car.id === id ? updatedCar : car));
    return updatedCar;
  }
}
