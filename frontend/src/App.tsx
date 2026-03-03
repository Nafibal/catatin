import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TodoForm } from "./components/TodoForm";
import { SearchBar } from "./components/SearchBar";
import { TodoList } from "./components/TodoList";
import { useTodos } from "./hooks/useTodos";
import { TodoStatus } from "./types/todo";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [search, setSearch] = useState("");
  const { data: todos, isLoading, error } = useTodos(search);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 animate-fade-in">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8 border border-white/50">
            <h1 className="text-3xl sm:text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Todo Management System
            </h1>
            <p className="mt-2 text-slate-600">
              Organize your tasks efficiently with our modern bento grid
              interface
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 animate-slide-in animate-delay-100">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Add New Task
              </h2>
              <TodoForm />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 animate-slide-in animate-delay-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                Search Tasks
              </h2>
              <SearchBar search={search} onSearchChange={setSearch} />
            </div>

            <div className="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white animate-slide-in animate-delay-300">
              <h3 className="font-semibold mb-2">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-2xl font-bold">{todos?.length || 0}</div>
                  <div className="text-sm text-blue-100">Total Tasks</div>
                </div>
                <div className="bg-white/20 rounded-xl p-3">
                  <div className="text-2xl font-bold">
                    {todos?.filter((t) => t.status === TodoStatus.COMPLETED)
                      .length || 0}
                  </div>
                  <div className="text-sm text-blue-100">Completed</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/50 animate-slide-in animate-delay-400">
            <h2 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Your Tasks
            </h2>
            <TodoList
              todos={todos || []}
              isLoading={isLoading}
              error={error}
              search={search}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}

export default App;
