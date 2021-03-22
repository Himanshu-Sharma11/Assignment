import React from 'react';

const Inputs = ({ label, type, name, value, handleChange, className }) => {
  return (
    <div className='form-group'>
      <label className='form-label fw-bold'>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
        className={className}
      />
    </div>
  );
};

export default Inputs;
