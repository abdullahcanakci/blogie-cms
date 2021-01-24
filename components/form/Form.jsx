import React from "react";
import slugify from "slugify";
import Button from "./Button";

export default function Form({
  value: initialState,
  setValue: updateState,
  onSave,
  children,
}) {
  const updateForm = (value, key) => {
    updateState((prevState) => {
      const newState = Object.assign({}, prevState);
      newState[key] = value;
      return newState;
    });
  };

  const onSaveEvent = async () => {
    return await onSave(initialState);
  };

  // TODO: unique id
  return (
    <div>
      <div>
        {children.map((child) =>
          React.cloneElement(child, {
            value:
              initialState[
                child.props["dataKey"] ??
                  slugify(child.props["label"], { lower: true })
              ],
            setValue: (value) =>
              updateForm(
                value,
                child.props["dataKey"] ??
                  slugify(child.props["label"], { lower: true })
              ),
          })
        )}
      </div>
      <div className="px-4 py-3 text-right sm:px-6">
        <Button onSave={onSaveEvent} />
      </div>
    </div>
  );
}
