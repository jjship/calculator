import React from "react";

export const Button = (props) => {
  return (
    <>
      <button id={props.value}>{props.value}</button>
    </>
  );
};
