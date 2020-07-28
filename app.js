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
  "+",
  "C",
  "AC",
];

// Check character type
function isPoint(ch) {
  return ch === ".";
}
function isDigit(ch) {
  return /\d/.test(ch);
}
function isOperator(ch) {
  return /\+|-|\*|\/|\=/.test(ch);
}

// Set buttons class name
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
  if (item === "C") {
    button.className = "clear";
  }
  if (item === "AC") {
    button.className = "allClear";
  }
}

// Select wrapper from DOM & append buttons
const buttonsWrapper = document.getElementById("wrapper");

function appendButtonsToWrapper(values, wrapper) {
  values.forEach((item) => {
    let newButton = document.createElement("button");
    newButton.id = item;
    newButton.innerHTML = item;
    setButtonClassName(newButton, item);
    wrapper.appendChild(newButton);
  });
}

// Initialize calculator object
const calculator = {
  inputStore: "0",
  firstNum: null,
  operator: null,
  waitingForSecondNum: false,
};

// Perform calculation
function calculate(operator, firstNum, secondNum) {
  if (operator === "+") return firstNum + secondNum;
  if (operator === "-") return firstNum - secondNum;
  if (operator === "*") return firstNum * secondNum;
  if (operator === "/") return firstNum / secondNum;
  if (operator === "=") return secondNum;
}

// Update display
function updateDisplay(value) {
  const display = document.querySelector(".display");
  display.value = value;
}

// Character handlers
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
    if (value === "-" && inputStore === "0") {
      calculator.inputStore = value;
      return;
    } else {
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      calculator.firstNum = parseFloat(inputStore);
    }
  }
  function dontDivideByZero() {
    updateDisplay("not able to / by 0");
    calculator.waitingForSecondNum = true;
    calculator.inputStore = "";
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
  else if (operator === "/" && inputStore === "0") dontDivideByZero();
  else performCalc(value);
}

function handleClear() {
  const { waitingForSecondNum, inputStore } = calculator;
  function clearCharacter() {
    calculator.inputStore = inputStore.slice(0, -1);
  }
  function clearOperator() {
    calculator.operator = null;
    calculator.waitingForSecondNum = false;
  }
  if (waitingForSecondNum) clearOperator();
  else clearCharacter();
}

function handleAllClear() {
  function resetCalculator() {
    calculator.inputStore = "0";
    calculator.firstNum = null;
    calculator.operator = null;
    calculator.waitingForSecondNum = false;
    updateDisplay(calculator.inputStore);
  }
  resetCalculator();
}

// Event handlers
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

function handleClearInput(e) {
  handleClear();
  updateDisplay(calculator.inputStore);
}

function handleAllClearInput(e) {
  handleAllClear();
}

// DOM setup
appendButtonsToWrapper(buttonsArray, buttonsWrapper);
const digits = document.querySelectorAll(".digit");
const point = document.querySelector(".point");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const allClear = document.querySelector(".allClear");

digits.forEach((button) => {
  button.addEventListener("click", handleDigitInput);
});

point.addEventListener("click", handlePointInput);

operators.forEach((button) => {
  button.addEventListener("click", handleOperatorInput);
});

clear.addEventListener("click", handleClearInput);

allClear.addEventListener("click", handleAllClearInput);
