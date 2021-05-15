import classNames from "classnames";
import styles from "./index.module.scss";

const Row = ({ children, start = false, end = false }) => {
  return (
    <div
      className={classNames(styles.row, {
        [styles.start]: start,
        [`${styles.end}`]: end,
      })}
    >
      {children}
    </div>
  );
};

export default Row;
