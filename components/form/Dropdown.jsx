import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Dropdown({
  primaryLabel,
  onPrimaryAction,
  children,
  buttonClasses,
}) {
  const [open, setOpen] = useState(true);

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
    <div className="field has-addons">
      <p className="control">
        <button className={`button ${buttonClasses}`}>
          <span className="has-text-weight-medium">{primaryLabel}</span>
        </button>
      </p>
      <p className="control">
        <button className={`button ${buttonClasses}`}>
          <span className="icon is-small">
            <FontAwesomeIcon icon="chevron-down" />
          </span>
        </button>
      </p>
    </div>
  );
}
