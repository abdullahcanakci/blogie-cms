import classNames from "classnames";
import styles from "./index.module.scss";

const Card = ({ children, className = "" }) => {
  return (
    <div className={classNames(styles.card, className)}>
      <div className="card-body ">{children}</div>
    </div>
  );
};

const CardBody = ({ children }) => {
  return <div className={styles.card_body}>{children}</div>;
};

const CardHeader = ({ children }) => {
  return <div className={styles.card_header}>{children}</div>;
};

const CardFooter = ({ children }) => {
  return <div className={styles.card_footer}>{children}</div>;
};

Card.Body = CardBody;
Card.Header = CardHeader;
Card.Footer = CardFooter;

export default Card;
