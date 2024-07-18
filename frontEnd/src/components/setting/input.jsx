import React from 'react';

const Input = ({ label, input, msg, validation, newData }) => {
  return (
    <div className="form-group">
      <label htmlFor={label.for}>{label.content}</label>
      <input
        type={input.type}
        className={"form-control " + validation.class}
        id={input.id}
        name={input.name}
        aria-describedby={input.name + "Help"}
        placeholder={input.placeholder}
        onChange={newData}
        value={input.value}
      />
      <div className="invalid-feedback">{validation.msg}</div>
      <small id={input.name + "Help"} className="form-text text-muted">
        {msg}
      </small>
    </div>
  );
}

export default Input;
