import React from 'react';




const Btn = ({ submitForm, btn }) => {
  return (
    <input
      type={btn.type}
      className={btn.className}
      defaultValue={btn.value}
      onClick={submitForm}
    />
  );
}

export default Btn;
