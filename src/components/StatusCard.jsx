export default function StatusCard({ status }) {
  return (
    <div className="mt-6 rounded-xl bg-gray-100 p-4 text-center shadow-sm">

      <p className="text-lg font-medium">
        {status}
      </p>

    </div>
  );
}