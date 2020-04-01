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

const buttonsWrapper = document.getElementById("buttons");
function appendButtonsToWrapper(values, wrapper) {
  values.forEach(item => {
    let newButton = document.createElement("button");
    newButton.id = item;
    newButton.innerHTML = item;
    setButtonClassName(newButton, item);
    wrapper.appendChild(newButton);
  });
}
appendButtonsToWrapper(buttonsArray, buttonsWrapper);

let calculator = {
  onDisplay: "0",
  firstNum: null,
  operator: null,
  waitingForSecondNum: false
};
const calculate = {
  "+": (firstNum, secondNum) => firstNum + secondNum,
  "-": (firstNum, secondNum) => firstNum - secondNum,
  "*": (firstNum, secondNum) => firstNum * secondNum,
  "/": (firstNum, secondNum) => firstNum / secondNum,
  "=": (firstNum, secondNum) => secondNum
};

function updateDisplay(value) {
  let display = document.querySelector(".display");
  display.value = value;
}
function handleDigit(value) {
  const { firstNum, onDisplay, waitingForSecondNum } = calculator;
  if (!firstNum && onDisplay === "0") {
    calculator.onDisplay = value;
    return;
  }
  if (waitingForSecondNum) {
    calculator.onDisplay = value;
    calculator.waitingForSecondNum = false;
    return;
  }
  calculator.onDisplay += value;
}
function handlePoint(value) {
  const { onDisplay } = calculator;
  if (onDisplay.includes(value)) return;
  calculator.onDisplay += value;
}
function handleOperator(value) {
  const { firstNum, onDisplay, operator, waitingForSecondNum } = calculator;
  function setOperator(value) {
    if (value === "-" && onDisplay === "0") {
      calculator.onDisplay = value;
      return;
    } else {
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      calculator.firstNum = parseFloat(onDisplay);
    }
  }
  function performCalc(value) {
    const result = calculate[operator](
      firstNum,
      parseFloat(calculator.onDisplay)
    );
    calculator.onDisplay = String(result);
    calculator.firstNum = result;
    calculator.operator = value;
    calculator.waitingForSecondNum = true;
    updateDisplay(calculator.onDisplay);
  }
  if (!firstNum || waitingForSecondNum) setOperator(value);
  else performCalc(value);
}

const digits = document.querySelectorAll(".digit");
digits.forEach(button => {
  button.addEventListener("click", choice => {
    let input = choice.target.innerText;
    handleDigit(input);
    updateDisplay(calculator.onDisplay);
  });
});

const point = document.querySelector(".point");
point.addEventListener("click", choice => {
  const input = choice.target.innerText;
  handlePoint(input);
  updateDisplay(calculator.onDisplay);
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
  button.addEventListener("click", choice => {
    const input = choice.target.innerText;
    handleOperator(input);
  });
});
