export default function VoiceMic({ listening, onClick }) {
  return (
    <div className="flex justify-center">

      <button
        onClick={onClick}
        disabled={listening}
        className={`

        w-36
        h-36
        rounded-full

        text-6xl

        flex
        items-center
        justify-center

        shadow-xl
        transition-all
        duration-300

        ${
          listening
            ? "bg-red-500 scale-110 animate-pulse"
            : "bg-black hover:scale-105"
        }

        text-white

        `}
      >
        🎤
      </button>

    </div>
  );
}