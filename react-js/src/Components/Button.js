import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { setClassName } from '../utils/setClassName';

export const Button = (props) => {
  const { handleInput } = useContext(GlobalContext);

  return (
    <button
      key={props.value}
      onClick={() => {
        handleInput(props.value);
      }}
      id={props.value}
      className={setClassName(props.value)}
    >
      {props.value}
    </button>
  );
};
