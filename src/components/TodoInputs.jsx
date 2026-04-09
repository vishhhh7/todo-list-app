import { useState } from "react";

export default function TodoInputs({ onAdd }) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleAdd = () => {
    console.log("text is:", text);
    if (!text.trim()) return;

    onAdd(text, priority);
    setText("");
    setPriority("medium");
  };

  return (
    <div className="mb-4">
      {/* Text input + Add button */}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add a new task..."
          className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
        <button
          onClick={handleAdd}
          className="w-10 h-10 bg-indigo-700 text-white text-xl rounded-lg hover:bg-indigo-800 active:scale-95 transition-all"
        >
          +
        </button>
      </div>
      {/* Priority pills */}
      <div className="flex gap-2">
        {["high", "medium", "low"].map((p) => (
          <button
            key={p}
            onClick={() => setPriority(p)}
            className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
              ${
                priority === p
                  ? p === "high"
                    ? "bg-red-100 text-red-700 border-red-200"
                    : p === "medium"
                      ? "bg-amber-100 text-amber-700 border-amber-200"
                      : "bg-green-100 text-green-700 border-green-200"
                  : "bg-gray-50 text-gray-400 border-gray-200"
              }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
