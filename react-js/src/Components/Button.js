import React from "react";
import { SetClassName } from "./SetClassName";

export const Button = (props) => {
  return (
    <>
      <button id={props.value} className={SetClassName(props.value)}>
        {props.value}
      </button>
    </>
  );
};
