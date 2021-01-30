import Hint from "./Hint";
import Label from "./Label";

export default function Input({
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
    <div className="field">
      <Label label={label} />
      <div className="control">
        <input
          className="input"
          placeholder={placeholder}
          value={values[dataKey]}
          onChange={updateValue}
        />
      </div>
      <Hint hint={hint} />
    </div>
  );
}
