
const StateCart = ({label, value, delta }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {delta !== undefined && (
        <span
          className={`text-xs mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${
            delta >= 0
              ? "bg-green-50 text-green-600"
              : "bg-red-50 text-red-600"
          }`}
        >
          {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}%
        </span>
      )}
    </div>
  );
}

export default StateCart
