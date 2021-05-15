import styles from "./index.module.scss";

const CenterLayout = ({ children }) => {
  return <div className={styles.center_container}>{children}</div>;
};

export default CenterLayout;
