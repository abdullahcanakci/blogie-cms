import React, { useEffect, useState } from "react";
import slugify from "slugify";
import Button from "./Button";
import _get from "lodash/get";
import _set from "lodash/set";
import _cloneDeep from "lodash/cloneDeep";

export default function Form({ initialState = {}, onSave, children }) {
  const [state, setState] = useState(null);

  useEffect(() => {
    console.log(initialState);
    const newState = _cloneDeep(initialState);
    children.map((child) => {
      _set(
        newState,
        child.props["dataKey"],
        _get(initialState, child.props["dataKey"], "")
      );
    });
    setState(newState);
  }, []);

  const updateForm = (value, key) => {
    setState((prevState) => {
      const newState = _cloneDeep(prevState);
      _set(newState, key, value);
      return newState;
    });
  };

  const onSaveEvent = async () => {
    return await onSave(state);
  };

  // TODO: unique id
  return (
    <div className="column is-full box">
      <div>
        {state &&
          children.map((child, index) =>
            React.cloneElement(child, {
              key: child.props["dataKey"],
              values: state,
              setValues: updateForm,
            })
          )}
      </div>
      <div className="is-flex is-justify-content-flex-end">
        <Button onSave={onSaveEvent} />
      </div>
    </div>
  );
}
