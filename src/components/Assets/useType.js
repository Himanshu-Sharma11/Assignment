import { useState } from 'react';

const useType = () => {
  const [type, setType] = useState(false);
  return {
    type,
    setType,
  };
};

export default useType;
