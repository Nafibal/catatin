import { useState } from 'react';
import { useCreateTodo } from '../hooks/useTodos';
import type { CreateTodoDto } from '../types/todo';

export function TodoForm() {
  const [title, setTitle] = useState('');
  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dto: CreateTodoDto = { title: title.trim() };
    createTodo.mutate(dto, {
      onSuccess: () => {
        setTitle('');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter todo title..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={createTodo.isPending}
        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {createTodo.isPending ? 'Adding...' : 'Add'}
      </button>
    </form>
  );
}
