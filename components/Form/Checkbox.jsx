import classNames from "classnames";
import React from "react";
import { useController } from "react-hook-form";
import styles from "./input.module.scss";

const Checkbox = ({
  label,
  name,
  type,
  children,
  control,
  rules = {},
  defaultValue,
}) => {
  return (
    <>
      <fieldset className={classNames(styles.checkbox_group)}>
        <legend>{label}</legend>
        <div className={styles.option_container}>
          {React.Children.map(children, (child) =>
            React.cloneElement(child, {
              ...child.props,
              control,
              type,
              name,
              rules,
              defaultValue,
            })
          )}
        </div>
      </fieldset>
    </>
  );
};

const CheckboxOption = ({
  label,
  type,
  name,
  control,
  value,
  rules = {},
  defaultValue,
}) => {
  const { field } = useController({
    name,
    control,
    rules,
    defaultValue,
  });
  return (
    <label>
      <input
        type={type}
        name={name}
        {...field}
        value={value}
        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
      />
      {label}
    </label>
  );
};

Checkbox.Option = CheckboxOption;

export default Checkbox;
