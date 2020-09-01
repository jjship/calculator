import React from 'react';
import { SetClassName } from '../utils/SetClassName';

export const Button = (props) => {
  return (
    <button id={props.value} className={SetClassName(props.value)}>
      {props.value}
    </button>
  );
};
