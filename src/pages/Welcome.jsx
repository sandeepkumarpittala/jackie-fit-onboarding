import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">

      <h1 className="text-4xl font-bold text-gray-900">
        Jackie Jeans
      </h1>

      <p className="mt-4 text-center text-gray-600">
        Find jeans that actually fit.
      </p>

      <p className="mt-2 text-center text-gray-500">
        Complete a quick 2-minute Fit Quiz.
      </p>

      <Link
        to="/manual"
        className="mt-10 w-full max-w-xs rounded-xl bg-black text-white py-4 text-lg font-semibold text-center hover:bg-gray-800 transition"
      >
        Start Manual Quiz
      </Link>

      <Link
        to="/voice"
        className="mt-4 w-full max-w-xs rounded-xl border border-black py-4 text-lg font-semibold text-center hover:bg-gray-100 transition"
      >
        Start AI Voice Quiz
      </Link>

    </div>
  );
}