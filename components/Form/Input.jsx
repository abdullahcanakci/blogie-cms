import { useController } from "react-hook-form";
import styles from "./input.module.scss";

const Input = ({
  label = "No label",
  type = "text",
  name,
  rules = {},
  control,
  defaultValue = "",
}) => {
  const { field } = useController({ name, control, rules, defaultValue });

  return (
    <div className={styles.input_group}>
      <input type={type} name={name} placeholder=" " {...field} />
      <label>{label}</label>
      <span className="hidden">Name is required</span>
    </div>
  );
};

export default Input;
