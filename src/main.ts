import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for Replit
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  console.log('Task Management API running!');
  console.log(`Server: http://localhost:${port}`);
  console.log('Endpoints:');
  console.log('  GET    /tasks');
  console.log('  POST   /tasks');
  console.log('  GET    /tasks/:id');
  console.log('  PUT    /tasks/:id');
  console.log('  DELETE /tasks/:id');
}

bootstrap().catch(console.error);