export enum TodoStatus {
  CREATED = 'created',
  COMPLETED = 'completed',
  ON_GOING = 'on_going',
  PROBLEM = 'problem',
}

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
  problem_desc: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  status: TodoStatus;
  problem_desc?: string;
}

export interface SearchBarProps {
  search: string;
  onSearchChange: (search: string) => void;
}
