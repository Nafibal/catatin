import type { Todo } from '../types/todo';

interface TodoModalProps {
  todo: Todo | null;
  onClose: () => void;
}

export function TodoModal({ todo, onClose }: TodoModalProps) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Todo Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-semibold">ID:</span> {todo.id}
          </div>
          <div>
            <span className="font-semibold">Title:</span> {todo.title}
          </div>
          <div>
            <span className="font-semibold">Status:</span> {todo.status}
          </div>
          {todo.problem_desc && (
            <div>
              <span className="font-semibold">Problem Description:</span>
              <p className="mt-1 text-gray-600">{todo.problem_desc}</p>
            </div>
          )}
          <div>
            <span className="font-semibold">Created:</span>{' '}
            {new Date(todo.created_at).toLocaleString()}
          </div>
          <div>
            <span className="font-semibold">Updated:</span>{' '}
            {new Date(todo.updated_at).toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
