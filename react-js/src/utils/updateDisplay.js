import React from 'react';

export const updateDisplay = (props) => {
  const display = document.querySelector('.display');
  display.value = props;
};
