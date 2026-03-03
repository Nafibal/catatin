import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsOptional,
  ValidateIf,
} from 'class-validator';
import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}

export class UpdateTodoDto {
  @IsEnum(TodoStatus, {
    message: 'Status must be one of: created, completed, on_going, problem',
  })
  status: TodoStatus;

  @IsString()
  @IsOptional()
  @ValidateIf((o: UpdateTodoDto) => o.status === TodoStatus.PROBLEM)
  @IsNotEmpty({ message: 'problem_desc is required when status is problem' })
  problem_desc?: string;
}
