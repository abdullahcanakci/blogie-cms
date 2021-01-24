import { useState } from "react";
import Hint from "./Hint";
import Label from "./Label";
import Spinner from "./Spinner";

export default function Button({ label, onSave }) {
  const [clickable, setClickable] = useState(true);

  const onSaveButton = async (event) => {
    if (clickable) {
      setClickable(false);
      if (typeof onSave === "function") {
        await onSave();
      } else {
        console.error("Button.onSave is not a function");
      }
      setClickable(true);
    }
  };

  // TODO: unique id
  return (
    <button
      type="submit"
      className="inline-flex justify-center py-2 px-4 border border-transparent 
      shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600
      hover:bg-indigo-700 focus:outline-none  focus:bg-indigo-700
      focus:ring-indigo-500"
      onClick={onSaveButton}
    >
      {!clickable && <Spinner />}
      Save
    </button>
  );
}
