import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Display = () => {
  const { inputStore } = useContext(GlobalContext);
  return (
    <>
      <input type="text" className="display" value={inputStore} disabled />
    </>
  );
};
