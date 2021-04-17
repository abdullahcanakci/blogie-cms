const CenterLayout = ({ children }) => {
  return (
    <div
      className="container d-flex justify-content-center flex-column"
      style={{ height: "100vh" }}
    >
      <div className="row justify-content-center">{children}</div>
    </div>
  );
};

export default CenterLayout;
