export default function StatsBar({ todos }) {
  //  count total todos
  const total = todos.length;

  // count only the ones where done is true
  const done = todos.filter((t) => t.done).length;

  // calculate percentage - avoid dividing by zero
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div>
      {/* 3- stats numbers */}
      <div className="flex gap-5 mt-4">
        {[
          { label: "Total", value: total },
          { label: "Done", value: done },
          { label: "Pending", value: total - done },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-semibold text-white">{value}</p>
            <p className="text-xs text-indigo-300">{label}</p>
          </div>
        ))}
      </div>
      {/* Progess bar */}
      <div className="mt-3">
        <div className="h-1 bg-indigo-500 rounded-full">
          <div
            className="h-1 bg-white rounded-full transition-all duration-500"
            style={{ width: "${pct}%" }}
          />
        </div>
        <p className="text-xs text-indigo-300 mt-1">{pct}% complete</p>
      </div>
    </div>
  );
}
