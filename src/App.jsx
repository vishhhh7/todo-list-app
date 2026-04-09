import { useEffect, useState } from "react";
import StatsBar from "./components/StatsBar";
import TodoInputs from "./components/TodoInputs";
import FilterBar from "./components/FilterBar";
import TodoItem from "./components/TodoItem";

export default function App() {
  // State
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  // Saved to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]); // only run when todos changes

  // Functions
  const addTodo = (text, priority) => {
    console.log("addTodo received:", text, priority);
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text,
      priority,
      done: false,
    };

    console.log("new todo:", newTodo); // ← add this too
    console.log("all todos:", [...todos, newTodo]);

    // spread operator ... keeps all old todos, adds new one at end
    setTodos([...todos, newTodo]);
  };

  // Toggle
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  // Delete
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear done
  const clearDone = () => {
    setTodos(todos.filter((todo) => !todo.done));
  };

  // Filter Logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "done") return todo.done;
    if (filter === "high") return todo.priority === "high";
    return true;
  });

  // Split filtered todos into 2 grps for 2 sections
  const activeTodos = filteredTodos.filter((t) => !t.done);
  const doneTodos = filteredTodos.filter((t) => t.done);

  // Render

  return (
    // outer page starts
    <div className="min-h-screen bg-zinc-800 flex items-start justify-center pt-10 px-4">
      {/* white card starts */}
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {/* purple header starts */}
        <div className="bg-indigo-700 px-5 pt-6 pb-5">
          <h1 className="text-2xl font-semibold text-white">My Tasks</h1>
          <p className="text-sm text-indigo-200 mt-0.5">Sunday, April 5</p>

          {/* added StatsBar */}
          <StatsBar todos={todos} />
        </div>
        {/* purple header ends */}

        {/* Body */}
        <div className="p-5">
          {/* added TodoInputs */}
          <TodoInputs onAdd={addTodo} />

          {/* added FilterBar */}
          <FilterBar current={filter} onChange={setFilter} />

          {/* Active task section */}
          {activeTodos.length > 0 && (
            <div className="mb-4">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Active
              </p>
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}

          {/* Completed task section */}
          {doneTodos.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">
                Completed
              </p>
              <button
                onClick={clearDone}
                className="text-xs text-red-400 hover:text-red-600 transition-colors"
              >
                Clear all
              </button>

              {doneTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))}
            </div>
          )}
          {/* Empty state - shows when no tasks match the filter */}
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-400 text-sm py-8">
              {todos.length === 0
                ? "No tasks yet — add one above!"
                : "No tasks match this filter."}
            </p>
          )}
        </div>
      </div>
      {/* white card ends */}
    </div>
    // outer page ends
  );
}
