const CenterLayout = ({ children }) => {
  return (
    <div className="bg-gradient-primary" style={{ height: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">{children}</div>
      </div>
    </div>
  );
};

export default CenterLayout;
