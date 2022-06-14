import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // request 자체를 거부
      forbidNonWhitelisted: true, // "property hacked should not exist", validation decorator가 없는 데이터는 통과조차 하지 못함
      transform: true, // 데이터의 변환을 쉽게함 "2022"를 number로 받을 수 있음
    }),
  );
  await app.listen(3000);
}
bootstrap();
