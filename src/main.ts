import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';

const start = async () => {
  try {
    const config = new DocumentBuilder()
      .setTitle('Mate Logistics')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('NestJS, NestJS, Docker, Google Cloud, Postgersql, Sequileze')
      .build();
    const PORT = process.env.PORT || 3030;
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(PORT, () => {
      console.log(`Server ${PORT}-da ishga tushdi`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
