import { useState } from "react";
import { useCreateTodo } from "../hooks/useTodos";
import type { CreateTodoDto } from "../types/todo";

export function TodoForm() {
  const [title, setTitle] = useState("");
  const createTodo = useCreateTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const dto: CreateTodoDto = { title: title.trim() };
    createTodo.mutate(dto, {
      onSuccess: () => {
        setTitle("");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter todo title..."
          className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200 placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={createTodo.isPending || !title.trim()}
        className="w-full px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
      >
        {createTodo.isPending ? "Adding..." : "Add Task"}
      </button>
    </form>
  );
}
