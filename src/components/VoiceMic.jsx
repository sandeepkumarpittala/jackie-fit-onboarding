export default function VoiceMic({ listening, onClick }) {
  return (
    <div className="flex justify-center">

      <button
        onClick={onClick}
        disabled={listening}
        className={`
          relative
          w-40
          h-40
          rounded-full
          flex
          items-center
          justify-center
          text-6xl
          transition-all
          duration-500
          shadow-2xl

          ${
            listening
              ? "bg-gradient-to-br from-red-500 to-red-700 scale-110 animate-pulse"
              : "bg-gradient-to-br from-black via-gray-900 to-gray-700 hover:scale-105"
          }

          text-white
        `}
      >
        {listening && (
          <span className="absolute w-52 h-52 rounded-full border-4 border-red-400 animate-ping"></span>
        )}

        🎤

      </button>

    </div>
  );
}