export default function AnswerBubble({ answer }) {

  if (!answer) return null;

  return (

    <div className="mt-6">

      <p className="text-gray-500 mb-2">
        Last Answer
      </p>

      <div className="rounded-xl bg-green-100 p-4">

        <p className="font-semibold text-lg">
          ✓ {answer}
        </p>

      </div>

    </div>

  );

}