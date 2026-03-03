export const TodoStatus = {
  CREATED: 'created',
  COMPLETED: 'completed',
  ON_GOING: 'on_going',
  PROBLEM: 'problem',
} as const;

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];

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
