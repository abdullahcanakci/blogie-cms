export default function Label({ label, uniqueId }) {
  return (
    <label className="block text-sm font-medium text-gray-100">
      {label ?? ""}
    </label>
  );
}
