import React from 'react';
import { setClassName } from '../utils/setClassName';

export const Button = (props) => {
  return (
    <button id={props.value} className={setClassName(props.value)}>
      {props.value}
    </button>
  );
};
