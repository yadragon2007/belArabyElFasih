import React from 'react';



const Input = ({ inputData, labelData, newData }) => {


  return (
    <div className="form-group">
      <label htmlFor={labelData.for} className="text-secondary">
        {labelData.value}
      </label>
      <input
        type={inputData.type}
        className={"form-control " + inputData.vlidation}
        name={inputData.name}
        id={inputData.id}
        onChange={(e) => newData(e)}
        required
      />
      <div className="invalid-feedback"></div>

    </div>
  );
}

export default {
  Input,
};
