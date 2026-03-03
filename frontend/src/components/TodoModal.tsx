import type { Todo } from "../types/todo";
import { TodoStatus } from "../types/todo";

interface TodoModalProps {
  todo: Todo | null;
  onClose: () => void;
}

const statusConfig: Record<
  string,
  { label: string; bgColor: string; textColor: string; dotColor: string }
> = {
  [TodoStatus.CREATED]: {
    label: "Created",
    bgColor: "bg-slate-100",
    textColor: "text-slate-700",
    dotColor: "bg-slate-400",
  },
  [TodoStatus.ON_GOING]: {
    label: "On Going",
    bgColor: "bg-blue-100",
    textColor: "text-blue-700",
    dotColor: "bg-blue-500",
  },
  [TodoStatus.COMPLETED]: {
    label: "Completed",
    bgColor: "bg-emerald-100",
    textColor: "text-emerald-700",
    dotColor: "bg-emerald-500",
  },
  [TodoStatus.PROBLEM]: {
    label: "Problem",
    bgColor: "bg-red-100",
    textColor: "text-red-700",
    dotColor: "bg-red-500",
  },
};

export function TodoModal({ todo, onClose }: TodoModalProps) {
  if (!todo) return null;

  const config = statusConfig[todo.status];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-lg w-full animate-slide-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Task Details</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <span className="text-slate-400 font-mono text-sm">#{todo.id}</span>
            <span
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${config.bgColor} ${config.textColor} flex items-center gap-2`}
            >
              <span
                className={`w-2 h-2 rounded-full ${config.dotColor}`}
              ></span>
              {config.label}
            </span>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-500 mb-2">
              Title
            </label>
            <p className="text-lg text-slate-800 font-medium">{todo.title}</p>
          </div>

          {todo.problem_desc && (
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <label className="block text-sm font-semibold text-red-700 mb-2">
                Problem Description
              </label>
              <p className="text-red-600">{todo.problem_desc}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <label className="block text-sm font-semibold text-slate-500 mb-1">
                Created
              </label>
              <p className="text-slate-700 text-sm">
                {new Date(todo.created_at).toLocaleString()}
              </p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <label className="block text-sm font-semibold text-slate-500 mb-1">
                Updated
              </label>
              <p className="text-slate-700 text-sm">
                {new Date(todo.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-linear-to-r from-slate-500 to-slate-600 text-white font-semibold rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
