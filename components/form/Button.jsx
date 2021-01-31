import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Button({
  label,
  onClick,
  children,
  buttonClasses = "",
  iconLeft = false,
  iconRight = false,
}) {
  const [clickable, setClickable] = useState(true);

  const onClicked = async (event) => {
    if (clickable) {
      setClickable(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (typeof onClick === "function") {
        await onClick();
      } else {
        console.error("Button.onClick is not a function");
      }
      setClickable(true);
    }
  };

  // TODO: unique id
  return (
    <button
      type="submit"
      className={
        "button is-primary" +
        (!clickable ? " is-loading disabled " : " ") +
        buttonClasses
      }
      onClick={onClicked}
    >
      {iconLeft && (
        <span className="icon is-small mr-1">
          <FontAwesomeIcon icon={iconLeft} />
        </span>
      )}
      {children}
      {iconRight && (
        <span className="icon is-small ml-1">
          <FontAwesomeIcon icon={iconRight} />
        </span>
      )}
    </button>
  );
}
