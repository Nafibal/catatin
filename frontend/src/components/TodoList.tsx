import { useState } from "react";
import { useUpdateTodo } from "../hooks/useTodos";
import type { Todo } from "../types/todo";
import { TodoStatus } from "../types/todo";
import { TodoModal } from "./TodoModal";

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  error: unknown;
  search?: string;
}

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  error: unknown;
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

export function TodoList({
  todos,
  isLoading,
  error,
  search = "",
}: TodoListProps) {
  const updateTodo = useUpdateTodo();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [editingProblemTodoId, setEditingProblemTodoId] = useState<number | null>(null);
  const [problemDescInput, setProblemDescInput] = useState('');

  const handleStatusChange = (id: number, newStatus: TodoStatus) => {
    if (newStatus === TodoStatus.PROBLEM) {
      setEditingProblemTodoId(id);
      setProblemDescInput('');
    } else {
      updateTodo.mutate({ id, dto: { status: newStatus } });
    }
  };

  const handleProblemDescSubmit = (id: number) => {
    if (problemDescInput.trim()) {
      updateTodo.mutate(
        { id, dto: { status: TodoStatus.PROBLEM, problem_desc: problemDescInput.trim() } },
        {
          onSuccess: () => {
            setEditingProblemTodoId(null);
            setProblemDescInput('');
          }
        }
      );
    }
  };

  const handleProblemDescCancel = () => {
    setEditingProblemTodoId(null);
    setProblemDescInput('');
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-slate-100 rounded-xl p-6 space-y-4 animate-pulse"
          >
            <div className="h-4 bg-slate-200 rounded w-3/4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
            <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Error loading todos</div>
        <div className="text-red-500 text-sm">Please try again later</div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-12 text-center border-2 border-dashed border-slate-200">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">
          No tasks found
        </h3>
        <p className="text-slate-500">
          {search
            ? "Try adjusting your search terms"
            : "Add your first task to get started!"}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {todos.map((todo, index) => {
          const config = statusConfig[todo.status];
          return (
            <div
              key={todo.id}
              className="group bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-blue-300 hover:-translate-y-1 transition-all duration-200"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm font-mono">
                    #{todo.id}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${config.bgColor} ${config.textColor} flex items-center gap-1.5`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`}
                    ></span>
                    {config.label}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-slate-800 mb-4 line-clamp-2">
                {todo.title}
              </h3>

              {editingProblemTodoId === todo.id && (
                <div className="mb-4 p-4 bg-red-50 rounded-xl border border-red-200 animate-in slide-in-from-top-2">
                  <label className="block text-sm font-semibold text-red-700 mb-2">
                    Problem Description (required)
                  </label>
                  <textarea
                    value={problemDescInput}
                    onChange={(e) => setProblemDescInput(e.target.value)}
                    placeholder="Describe the problem you're encountering..."
                    className="w-full px-3 py-2 bg-white border border-red-300 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/10 transition-all resize-none"
                    rows={3}
                  />
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => handleProblemDescSubmit(todo.id)}
                      disabled={!problemDescInput.trim()}
                      className="flex-1 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed transition-all"
                    >
                      Save Problem
                    </button>
                    <button
                      onClick={handleProblemDescCancel}
                      className="px-4 py-2 bg-white border border-slate-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <select
                  value={todo.status}
                  disabled={editingProblemTodoId === todo.id}
                  onChange={(e) =>
                    handleStatusChange(todo.id, e.target.value as TodoStatus)
                  }
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {Object.entries(TodoStatus).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key
                        .replace("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setSelectedTodo(todo)}
                  className="px-4 py-2 bg-linear-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selectedTodo && (
        <TodoModal todo={selectedTodo} onClose={() => setSelectedTodo(null)} />
      )}
    </>
  );
}
