import classNames from "classnames";
import React from "react";
import styles from "./table.module.scss";

console.log(styles);
const Table = ({ children, data }) => {
  const onRender = (data, cell) => {
    if (cell.props.render) {
      return cell.props.render(data[cell.props.name]);
    } else {
      return <p>{data[cell.props.name]}</p>;
    }
  };
  return (
    <div className={styles.container}>
      <table className="min-w-max w-full table-auto">
        <thead>
          <tr className={styles.header}>
            {React.Children.map(children, function (child) {
              return (
                <th
                  className={classNames({
                    [`${styles.center}`]: child.props.center,
                  })}
                >
                  {child.props.label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className={styles.table}>
          {data?.map((entry) => (
            <tr className={styles.tr} key={entry.id}>
              {React.Children.map(children, function (child) {
                return React.cloneElement(child, {
                  ...child.props,
                  render: onRender(entry, child),
                });
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
