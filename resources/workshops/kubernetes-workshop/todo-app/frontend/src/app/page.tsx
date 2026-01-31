'use client';

import { useState, useEffect } from 'react';

type Todo = { id: number; todo: string; completed: boolean };

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [apiBase, setApiBase] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.RUNTIME_CONFIG?.API_URL) {
      setApiBase(window.RUNTIME_CONFIG.API_URL);
    } else {
      console.error('RUNTIME_CONFIG.API_URL is missing');
    }
  }, []);

  useEffect(() => {
    if (!apiBase) return;

    const fetchTodos = async () => {
      try {
        const response = await fetch(`${apiBase}/todos`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to fetch todos');

        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, [apiBase]); 

  const addTodo = async () => {
    if (!apiBase) return;
    if (!newTodo.trim()) return;

    try {
      const response = await fetch(`${apiBase}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: newTodo, completed: false }),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const addedTodo = await response.json();
      setTodos((prev) => [...prev, addedTodo]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id: number) => {
    if (!apiBase) return;

    const todoToToggle = todos.find((t) => t.id === id);
    if (!todoToToggle) return;

    try {
      const response = await fetch(`${apiBase}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...todoToToggle, completed: !todoToToggle.completed }),
      });
      if (!response.ok) throw new Error('Failed to update todo');

      const updatedTodo = await response.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updatedTodo : t))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  if (!apiBase) return <div>Loading...</div>; // Wait until API URL is ready

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto flex justify-between items-center px-6 py-4">
          <img src="/logo_bnerd.svg" alt="Logo" className="h-10" />
          <h1 className="text-xl font-semibold">ToDo App</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto p-6">
          {/* Input Section */}
          <div className="mb-6 flex space-x-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTodo}
              className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Add Task
            </button>
          </div>

          {/* ToDo List */}
          <ul className="space-y-4">
            {todos.map((todo) => (
              <li
                key={todo.id}
                onClick={() => toggleComplete(todo.id)}
                className={`cursor-pointer p-4 rounded-lg text-black transition-all duration-300 ${
                  todo.completed
                    ? 'bg-gray-100 border border-gray-300 text-gray-500 line-through'
                    : 'bg-white border border-gray-300 text-gray-900'
                }`}
              >
                {todo.todo}
              </li>
            ))}
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center text-white py-4 mt-12">
        <p className="text-sm">Made with ☕️ & 🤍 by b&apos;nerd GmbH</p>
      </footer>
    </div>
  );
}