import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { setClassName } from '../utils/setClassName';

export const Button = (props) => {
  const { handleDigit, handlePoint } = useContext(GlobalContext);

  // const performAction = (value) => {
  //   const type = setClassName(value);
  //   if (type === 'digit') handleDigit(value);
  //   // if (type === 'point') handlePoint(value);
  // };
  return (
    <button
      key={props.value}
      onClick={() => handleDigit(props.value)}
      id={props.value}
      className={setClassName(props.value)}
    >
      {props.value}
    </button>
  );
};
