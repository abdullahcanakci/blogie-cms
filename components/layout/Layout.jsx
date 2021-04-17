import Menu from "./Menu";
import Navbar from "./Navbar";

const Layout = ({ children, current }) => {
  return (
    <div id="container">
      <Navbar current={current} />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
