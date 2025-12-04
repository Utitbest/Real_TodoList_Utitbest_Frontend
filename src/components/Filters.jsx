export default function Filters({ filter, setFilter }) {
  const options = ['All', 'Active', 'Completed'];
  return (
    <div className="flex space-x-2">
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => setFilter(opt)}
          className={`px-2 py-1 rounded ${filter === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
