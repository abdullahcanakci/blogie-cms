export default function Label({ label, uniqueId }) {
  return <label className="label">{label ?? ""}</label>;
}
