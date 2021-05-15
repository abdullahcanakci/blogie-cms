import classNames from "classnames";

import styles from "./table.module.scss";

const Cell = ({ center, width, label, name, render }) => {
  return (
    <td>
      <div
        className={classNames({
          [`${styles.center}`]: center,
        })}
      >
        {render}
      </div>
    </td>
  );
};

export default Cell;
