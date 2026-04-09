export default function FilterBar({ current, onChange }) {
  const filters = ["all", "active", "done", "high"];
  return (
    <div className="flex gap-2 mb-5">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`text-xs px-3 py-1 rounded-full border capitalize transition-all
            ${
              current === f
                ? "bg-indigo-100 text-indigo-700 border-indigo-200"
                : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
            }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
