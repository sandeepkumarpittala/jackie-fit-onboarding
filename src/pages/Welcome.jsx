import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 flex items-center justify-center p-6">

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-[32px] shadow-2xl border border-gray-200 p-10">

        <div className="text-center">

          <div className="text-6xl mb-4">👖</div>

          <h1 className="text-5xl font-extrabold text-gray-900">
            Jackie AI
          </h1>

          <p className="text-xl text-gray-500 mt-3">
            Find Your Perfect Denim Fit
          </p>

          <p className="text-gray-600 mt-6 leading-8 max-w-xl mx-auto">
            Experience an AI-powered onboarding that understands your
            body measurements, preferred denim brands and personal fit
            preferences to recommend your perfect Jackie Jeans size.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-5 mt-12">

          <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-sm">
            <div className="text-3xl">🎤</div>
            <h3 className="font-bold mt-3">
              AI Voice Assistant
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Natural voice conversation
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-sm">
            <div className="text-3xl">📏</div>
            <h3 className="font-bold mt-3">
              Smart Measurements
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Personalized fitting
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-sm">
            <div className="text-3xl">👖</div>
            <h3 className="font-bold mt-3">
              Denim Intelligence
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Learns your favorite brands
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-6 text-center shadow-sm">
            <div className="text-3xl">⚡</div>
            <h3 className="font-bold mt-3">
              2 Minute Setup
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Fast AI onboarding
            </p>
          </div>

        </div>

        <div className="mt-12 space-y-4">

          <button
            onClick={() => navigate("/voice")}
            className="w-full py-5 rounded-2xl bg-black text-white text-lg font-semibold hover:bg-gray-900 transition-all duration-300 hover:scale-[1.02]"
          >
            🎤 Start AI Voice Experience
          </button>

          <button
            onClick={() => navigate("/manual")}
            className="w-full py-5 rounded-2xl border-2 border-gray-300 text-lg font-semibold hover:bg-gray-100 transition-all duration-300"
          >
            ✍️ Fill Manually
          </button>

        </div>

        <div className="mt-10 text-center text-gray-400 text-sm">
          Powered by Jackie Jeans AI • Hackathon Edition
        </div>

      </div>

    </div>
  );
}