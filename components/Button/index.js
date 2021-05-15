import { useState } from "react";
import classNames from "classnames";
import styles from "./index.module.scss";

const Button = ({ label, onClick, style = "primary", type = "button" }) => {
  const [loading, setLoading] = useState(false);

  const handleOnClick = async (e) => {
    if (onClick) {
      setLoading(true);
      await onClick();
      setLoading(false);
    }
  };

  return (
    <button
      type={type}
      onClick={handleOnClick}
      className={classNames(styles.button, { [`${styles[style]}`]: true })}
    >
      {label}
    </button>
  );
};

export { Button };
