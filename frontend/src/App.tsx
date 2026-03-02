import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoForm } from './components/TodoForm';
import { SearchBar } from './components/SearchBar';
import { TodoList } from './components/TodoList';
import { useTodos } from './hooks/useTodos';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const [search, setSearch] = useState('');
  const { data: todos, isLoading, error } = useTodos(search);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Todo Management System
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <TodoForm />
          <SearchBar search={search} onSearchChange={setSearch} />
          <TodoList todos={todos || []} isLoading={isLoading} error={error} />
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
