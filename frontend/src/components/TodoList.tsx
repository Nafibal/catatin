import { useState } from 'react';
import { useUpdateTodo } from '../hooks/useTodos';
import type { Todo } from '../types/todo';
import { TodoStatus } from '../types/todo';
import { TodoModal } from './TodoModal';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  error: unknown;
}

export function TodoList({ todos, isLoading, error }: TodoListProps) {
  const updateTodo = useUpdateTodo();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleStatusChange = (id: number, status: TodoStatus) => {
    updateTodo.mutate({ id, dto: { status } });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading todos...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading todos. Please try again.
      </div>
    );
  }

  if (todos.length === 0) {
    return <div className="text-center py-8 text-gray-500">No todos found.</div>;
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">#</th>
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{todo.title}</td>
                <td className="border px-4 py-2">
                  <select
                    value={todo.status}
                    onChange={(e) =>
                      handleStatusChange(todo.id, e.target.value as TodoStatus)
                    }
                    className="px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value={TodoStatus.CREATED}>Created</option>
                    <option value={TodoStatus.ON_GOING}>On Going</option>
                    <option value={TodoStatus.COMPLETED}>Completed</option>
                    <option value={TodoStatus.PROBLEM}>Problem</option>
                  </select>
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => setSelectedTodo(todo)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
}
