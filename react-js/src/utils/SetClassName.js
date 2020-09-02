import React from 'react';

// Check character type
function isPoint(ch) {
  return ch === '.';
}
function isDigit(ch) {
  return /\d/.test(ch);
}
function isOperator(ch) {
  return /\+|-|\*|\/|\=/.test(ch);
}

export const setClassName = (props) => {
  return isDigit(props)
    ? 'digit'
    : isPoint(props)
    ? 'point'
    : isOperator(props) || props === 'C' || props === 'AC'
    ? 'operator'
    : null;
};
