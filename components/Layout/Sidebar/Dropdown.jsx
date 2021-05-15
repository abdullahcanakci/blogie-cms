import classNames from "classnames";
import { useState } from "react";
import styles from "./dropdown.module.scss";

const Dropdown = ({ children, label }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={styles.container}
      onClick={() => setIsExpanded((prev) => !prev)}
      onBlur={() => setTimeout(() => setIsExpanded(false), 150)}
    >
      <button className={styles.button}>
        <span>{label}</span>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform md:-mt-1"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div
        className={classNames(styles.links_expander, {
          [`${styles.expanded}`]: isExpanded,
        })}
      >
        <div className={styles.links_container}>{children}</div>
      </div>
    </div>
  );
};

export default Dropdown;
