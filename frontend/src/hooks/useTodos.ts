import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from './api';
import type { Todo, CreateTodoDto, UpdateTodoDto } from '../types/todo';

export function useTodos(search: string = '') {
  return useQuery<Todo[]>({
    queryKey: ['todos', search],
    queryFn: async () => {
      const params = search ? { search } : {};
      const { data } = await apiClient.get('/api/todos', { params });
      return data;
    },
  });
}

export function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (dto: CreateTodoDto) => {
      const { data } = await apiClient.post<Todo>('/api/todos', dto);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, dto }: { id: number; dto: UpdateTodoDto }) => {
      const { data } = await apiClient.patch<Todo>(`/api/todos/${id}`, dto);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
}
