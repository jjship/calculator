export const calculate = (operator, firstNum, secondNum) => {
  if (operator === '+') return firstNum + secondNum;
  if (operator === '-') return firstNum - secondNum;
  if (operator === '*') return firstNum * secondNum;
  if (operator === '/') return firstNum / secondNum;
  if (operator === '=') return secondNum;
};
