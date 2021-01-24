import Label from "./Label";
import Hint from "./Hint";
import ReactQuill from "react-quill";

export default function TextEditor({
  value,
  setValue,
  label,
  placeholder,
  hint,
}) {
  const updateValue = (value) => {
    setValue(value);
  };
  // TODO: unique id
  return (
    <div className="py-2">
      <Label label={label} />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={updateValue}
        placeholder={placeholder}
        className="bg-white"
      />
      <Hint hint={hint} />
    </div>
  );
}
