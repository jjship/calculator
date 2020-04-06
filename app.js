const buttonsArray = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  ".",
  "/",
  "*",
  "-",
  "=",
  "+"
];

function isPoint(ch) {
  return ch === ".";
}
function isDigit(ch) {
  return /\d/.test(ch);
}
function isOperator(ch) {
  return /\+|-|\*|\/|\=/.test(ch);
}

function setButtonClassName(button, item) {
  if (isDigit(item)) {
    button.className = "digit";
  }
  if (isPoint(item)) {
    button.className = "point";
  }
  if (isOperator(item)) {
    button.className = "operator";
  }
}
const buttonsWrapper = document.getElementById("wrapper");
function appendButtonsToWrapper(values, wrapper) {
  values.forEach(item => {
    let newButton = document.createElement("button");
    newButton.id = item;
    newButton.innerHTML = item;
    setButtonClassName(newButton, item);
    wrapper.appendChild(newButton);
  });
}
let calculator = {
  inputStore: "0",
  firstNum: null,
  operator: null,
  waitingForSecondNum: false
};
function calculate(operator, firstNum, secondNum) {
  if (operator === "+") return firstNum + secondNum;
  if (operator === "-") return firstNum - secondNum;
  if (operator === "*") return firstNum * secondNum;
  if (operator === "/") return firstNum / secondNum;
  if (operator === "=") return secondNum;
}
function updateDisplay(value) {
  const display = document.querySelector(".display");
  display.value = value;
}
function handleDigit(value) {
  const { firstNum, inputStore, waitingForSecondNum } = calculator;
  if (!firstNum && inputStore === "0") {
    calculator.inputStore = value;
    return;
  }
  if (waitingForSecondNum) {
    calculator.inputStore = value;
    calculator.waitingForSecondNum = false;
    return;
  }
  calculator.inputStore += value;
}
function handlePoint(value) {
  const { inputStore } = calculator;
  if (inputStore.includes(value)) return;
  calculator.inputStore += value;
}
function handleOperator(value) {
  const { firstNum, inputStore, operator, waitingForSecondNum } = calculator;
  function setOperator(value) {
    // check for dividing by 0
    if (value === "-" && inputStore === "0") {
      calculator.inputStore = value;
      return;
    } else {
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      calculator.firstNum = parseFloat(inputStore);
    }
  }
  function performCalc(value) {
    const result = calculate(
      operator,
      firstNum,
      parseFloat(calculator.inputStore)
    );
    calculator.inputStore = String(result);
    calculator.firstNum = result;
    calculator.operator = value;
    calculator.waitingForSecondNum = true;
    updateDisplay(calculator.inputStore);
  }
  if (!firstNum || waitingForSecondNum) setOperator(value);
  else performCalc(value);
}

function handleDigitInput(e) {
  let inputValue = e.target.innerText;
  handleDigit(inputValue);
  updateDisplay(calculator.inputStore);
}
function handlePointInput(e) {
  const inputValue = e.target.innerText;
  handlePoint(inputValue);
  updateDisplay(calculator.inputStore);
}
function handleOperatorInput(e) {
  const inputValue = e.target.innerText;
  handleOperator(inputValue);
}

appendButtonsToWrapper(buttonsArray, buttonsWrapper);
const digits = document.querySelectorAll(".digit");
const point = document.querySelector(".point");
const operators = document.querySelectorAll(".operator");

digits.forEach(button => {
  button.addEventListener("click", handleDigitInput);
});
point.addEventListener("click", handlePointInput);
operators.forEach(button => {
  button.addEventListener("click", handleOperatorInput);
});
