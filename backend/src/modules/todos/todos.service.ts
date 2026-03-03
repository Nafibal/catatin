import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Todo, TodoStatus } from './entities/todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  async findAll(search?: string): Promise<Todo[]> {
    if (search) {
      return this.todoRepository.find({
        where: { title: Like(`%${search}%`) },
        order: { created_at: 'DESC' },
      });
    }
    return this.todoRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto,
      status: TodoStatus.CREATED,
    });
    return this.todoRepository.save(todo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });

    if (!todo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }
}
