import Label from "./Label";
import Hint from "./Hint";
import ReactQuill from "react-quill";

export default function TextEditor({
  values,
  setValues,
  label,
  placeholder,
  hint,
  dataKey,
}) {
  const updateValue = (value) => {
    setValues(value, dataKey);
  };
  // TODO: unique id
  return (
    <div className="py-2">
      <Label label={label} />
      <ReactQuill
        theme="snow"
        value={values[dataKey]}
        onChange={updateValue}
        placeholder={placeholder}
        className="bg-white"
      />
      <Hint hint={hint} />
    </div>
  );
}
