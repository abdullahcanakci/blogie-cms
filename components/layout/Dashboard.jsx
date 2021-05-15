import Sidebar from "components/Sidebar";
import styles from "./layout.module.scss";

const Dashboard = ({ children, current }) => {
  return (
    <div className={styles.dashboard_container}>
      <Sidebar current={current}></Sidebar>
      <div style={{ width: "100%" }}>{children}</div>
    </div>
  );
};

export default Dashboard;
