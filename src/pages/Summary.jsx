import { useLocation } from "react-router-dom";

export default function Summary() {

  const { state } = useLocation();

  const answers = state?.answers || {};
  <pre className="bg-gray-100 p-4 rounded mt-4">
  {JSON.stringify(answers, null, 2)}
</pre>

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold mb-8">
          Your Fit Profile
        </h1>

        <div className="space-y-4">

          <p>
            <strong>Height:</strong>{" "}
            {answers[1] || "-"}
          </p>

          <p>
            <strong>Weight:</strong>{" "}
            {answers[2] || "Skipped"}
          </p>

          <p>
            <strong>Waist:</strong>{" "}
            {answers[3] || "-"}
          </p>

          <p>
            <strong>Hip:</strong>{" "}
            {answers[4] || "-"}
          </p>

          <p>
            <strong>Waist Fit:</strong>{" "}
            {answers[5] || "-"}
          </p>

          <p>
            <strong>Rise:</strong>{" "}
            {answers[6] || "-"}
          </p>

          <p>
            <strong>Thigh Fit:</strong>{" "}
            {answers[7] || "-"}
          </p>

          <div>

  <strong>Brands</strong>

  {(answers[8] || []).length > 0 ? (

    <ul className="list-disc ml-6 mt-2">

      {answers[8].map((brand) => (

        <li key={brand}>

          {brand} — Size {answers[9]?.[brand] || "-"}

        </li>

      ))}

    </ul>

  ) : (

    <p className="text-gray-500 mt-2">
      None Selected
    </p>

  )}

</div>

          <p>
            <strong>Biggest Fit Issue:</strong>{" "}
            {answers[10] || "-"}
          </p>

        </div>

        <button
          onClick={() =>
            window.location.href =
              "https://jackie-jeans.vercel.app/"
          }
          className="mt-8 w-full bg-black text-white rounded-xl py-4 text-lg hover:bg-gray-900 transition"
        >
          Continue to Jackie Jeans →
        </button>

      </div>

    </div>

  );

}