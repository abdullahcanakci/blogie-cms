import { useState } from "react";

export default function Button({ label, onSave }) {
  const [clickable, setClickable] = useState(true);

  const onSaveButton = async (event) => {
    if (clickable) {
      setClickable(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
      className={
        "button is-primary" + (!clickable ? " is-loading disabled" : "")
      }
      onClick={onSaveButton}
    >
      Save
    </button>
  );
}
