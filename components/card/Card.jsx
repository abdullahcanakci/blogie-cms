const Card = ({ children, className = "" }) => {
  return (
    <div className={className}>
      <div className="card o-hidden border-0 shadow-lg my-5">
        <div className="card-body p-4">{children}</div>
      </div>
    </div>
  );
};

export default Card;
