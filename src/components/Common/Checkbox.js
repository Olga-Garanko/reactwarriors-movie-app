import React from "react";

const Checkbox = props => {
  const {
    id,
    label,
    name,
    checked,
    onCheck
  } = props;
  return (
    <div className="form-group">
      <div className="form-check">
        <input
          id={id}
          type='checkbox'
          className="form-check-input"
          name={name}
          checked={checked}
          onChange={onCheck}
        />
        <label htmlFor={id} className="form-check-label">{label}</label>
      </div>
    </div>
  );
};

export default Checkbox;
