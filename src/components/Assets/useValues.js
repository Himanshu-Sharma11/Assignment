import { useState } from 'react';

const useValues = (initialState) => {
  /*use state */
  const [values, setValues] = useState(initialState);

  /*handle change */
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClear = (e) => {
    setValues(initialState);
  };
  return {
    values,
    setValues,
    handleChange,
    handleClear,
  };
};

export default useValues;
