import React from "react";
import Button from "components/form/Button";

export default function Table({ renderer, columns, entries }) {
  const onPrev = async () => {};
  const onNext = async () => {};

  return (
    <div>
      <table className="table is-fullwidth is-striped is-hoverable">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th className={column.className} key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) =>
            React.createElement(renderer, {
              key: entry._id ?? index,
              entry,
              columns,
            })
          )}
        </tbody>
      </table>
      <div className="is-flex is-justify-content-flex-end">
        <div className="field has-addons">
          <p className="control">
            <Button onClick={onPrev} iconLeft="chevron-left">
              Prev
            </Button>
          </p>
          <p className="control">
            <Button onClick={onNext} iconRight="chevron-right">
              Next
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
}
