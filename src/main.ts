import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      // validationError: {
      //   target: false,
      //   value: true,
      // },
    }),
  );
  app.enableCors();
  await app.listen(7000);
}
main();
