import Label from "./Label";
import Hint from "./Hint";

export default function Textarea({
  values,
  setValues,
  label,
  placeholder,
  hint,
  dataKey,
}) {
  const updateValue = (e) => {
    setValues(e.target.value, dataKey);
  };
  // TODO: unique id
  return (
    <div className="py-2">
      <Label label={label} />
      <div className="mt-1">
        <textarea
          className="textarea"
          rows="6"
          placeholder={placeholder}
          value={values[dataKey]}
          onChange={updateValue}
        />
      </div>
      <Hint hint={hint} />
    </div>
  );
}
