import {
  IsString,
  IsOptional,
  IsEnum,
  MaxLength,
  IsDateString,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  title: string;

  @IsOptional()
  @IsString()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsEnum(TaskPriority)
  priority?: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: Date;
}