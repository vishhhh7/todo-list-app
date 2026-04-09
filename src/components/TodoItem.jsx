export default function TodoItem({ todo, onToggle, onDelete }) {
  const priorityStyles = {
    high: "bg-red-50 text-red-700",
    medium: "bg-amber-50 text-amber-700",
    low: "bg-green-50 text-green-700",
  };
  return (
    <div
      className={`flex items-center gap-3 py-2.5
    border-b border-gray-100 last-border-0
    transition-opacity duration-300
    ${todo.done ? "opacity-50" : "backdrop-opacity-100"}`}
    >
      {/* CheckBox circle */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-5 h-5 rounded-full border-2 shrink-0
      flex item-center justify-center transition-all
      ${
        todo.done
          ? "bg-indigo-700 border-indigo-700"
          : "border-gray-300 hover:border-indigo-400"
      } `}
      >
        {todo.done && <span className="text-white text-xs">✓</span>}
      </button>
      {/* Task text */}
      <span
        className={`flex-1 text-sm
          ${todo.done ? "line-through text-gray-400" : "text-gray-700"}`}
      >
        {todo.text}
      </span>
      {/* Priority badge */}
      <span
        className={`text-xs px-2 py-0.5 rounded-full capitalize shrink-0
        ${priorityStyles[todo.priority]}`}
      >
        {todo.priority === "medium" ? "med" : todo.priority}
      </span>
      {/* Delete button */}
      <button
        onClick={() => onDelete(todo.id)}
        className="text-gray-300 hover:text-red-400
        text-lg leading-none transition-colors shrink-0"
      >
        ×
      </button>
    </div>
  );
}
