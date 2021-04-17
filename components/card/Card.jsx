const Card = ({ children, className = "" }) => {
  return (
    <div className={`card m-3 shadow border-light ${className}`}>
      <div className="card-body ">{children}</div>
    </div>
  );
};

export default Card;
