import styles from "./layout.module.scss";

const CenterLayout = ({ children }) => {
  return <div className={styles.center_container}>{children}</div>;
};

export default CenterLayout;
