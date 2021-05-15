import classNames from "classnames";
import styles from "./Link.module.scss";
import { default as NextLink } from "next/link";

const Link = ({ label, isActive = false, link }) => {
  return (
    <NextLink href={link}>
      <a
        className={classNames(styles.link, { [`${styles.active}`]: isActive })}
        href={link}
      >
        {label}
      </a>
    </NextLink>
  );
};

export default Link;
