import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/tasks.db',
      autoLoadEntities: true,
      synchronize: true, // Don't use in production
      logging: ['error'], // Reduce console noise
    }),
    TasksModule,
  ],
})
export class AppModule {}