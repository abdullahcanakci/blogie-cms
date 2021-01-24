import Hint from "./Hint";
import Label from "./Label";

export default function Input({ value, setValue, label, placeholder, hint }) {
  const updateValue = (e) => {
    setValue(e.target.value);
  };
  // TODO: unique id
  return (
    <div className="py-2 ">
      <Label label={label} />
      <div className="mt-1">
        <input
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 w-full sm:text-sm border-gray-300 rounded-md px-4 py-2"
          placeholder={placeholder}
          value={value}
          onChange={updateValue}
        />
      </div>
      <Hint hint={hint} />
    </div>
  );
}
