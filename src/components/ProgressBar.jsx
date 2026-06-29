export default function ProgressBar({ current, total }) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm text-gray-600 mb-2">
        <span>Question {current}</span>
        <span>{total} Questions</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full">
        <div
          className="h-3 bg-black rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}