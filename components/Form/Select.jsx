import { useController } from "react-hook-form";
import styles from "./input.module.scss";

const Select = ({ label, name, control, children, rules, defaultValue }) => {
  const { field } = useController({ control, name, rules, defaultValue });

  return (
    <div className={styles.select_group}>
      <select name="name" {...field}>
        {children}
      </select>
    </div>
  );
};

const SelectOption = ({ label }) => {
  return <option>{label}</option>;
};

Select.Option = SelectOption;

export default Select;
