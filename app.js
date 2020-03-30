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
let calculator = {
  onDisplay: "0",
  firstNum: null,
  operator: null,
  waitingForSecondNum: false,
  secondNum: null
};
function isPoint(ch) {
  return ch === ".";
}
function isDigit(ch) {
  return /\d/.test(ch);
}
function isOperator(ch) {
  return /\+|-|\*|\/|\=/.test(ch);
}
const buttonsWrapper = document.getElementById("buttons");
function appendButtonsToWrapper(buttonsArray, buttonsWrapper) {
  buttonsArray.forEach(item => {
    let newButton = document.createElement("button");
    newButton.id = item;
    newButton.innerHTML = item;
    if (isDigit(item)) {
      newButton.className = "digit";
    }
    if (isPoint(item)) {
      newButton.className = "point";
    }
    if (isOperator(item)) {
      newButton.className = "operator";
    }
    buttonsWrapper.appendChild(newButton);
  });
}
const calculate = {
  "+": (firstNum, secondNum) => firstNum + secondNum,
  "-": (firstNum, secondNum) => firstNum - secondNum,
  "*": (firstNum, secondNum) => firstNum * secondNum,
  "/": (firstNum, secondNum) => firstNum / secondNum,
  "=": (firstNum, secondNum) => secondNum
};
function updateDisplay() {
  let display = document.querySelector(".display");
  display.value = calculator.onDisplay;
}
appendButtonsToWrapper(buttonsArray, buttonsWrapper);
const digits = document.querySelectorAll(".digit");

digits.forEach(button => {
  button.addEventListener("click", e => {
    let value = e.target.innerText;
    let { firstNum, onDisplay, waitingForSecondNum, secondNum } = calculator;
    if (!waitingForSecondNum) {
      if (onDisplay === "0") calculator.onDisplay = value;
      else calculator.onDisplay += value;
      calculator.firstNum = parseFloat(calculator.onDisplay);
      updateDisplay();
    } else {
      if (!secondNum && onDisplay == firstNum) {
        calculator.onDisplay = value;
        calculator.secondNum = parseFloat(calculator.onDisplay);
        updateDisplay();
      } else {
        calculator.onDisplay += value;
        calculator.secondNum = parseFloat(calculator.onDisplay);
        updateDisplay();
      }
    }
  });
});

const point = document.querySelector(".point");
point.addEventListener("click", e => {
  const value = e.target.innerText;
  const { onDisplay } = calculator;
  if (onDisplay.includes(value)) return;
  calculator.onDisplay += value;
  updateDisplay();
  return;
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
  button.addEventListener("click", e => {
    const value = e.target.innerText;
    const { firstNum, operator, waitingForSecondNum, secondNum } = calculator;
    if (!firstNum) {
      if (value === "-") {
        calculator.onDisplay = value;
        return;
      } else return;
    }
    if (!waitingForSecondNum) {
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      return;
    }
    if (secondNum) {
      const result = calculate[operator](
        firstNum,
        parseFloat(calculator.onDisplay)
      );
      calculator.onDisplay = String(result);
      calculator.firstNum = result;
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      calculator.secondNum = null;
      updateDisplay();
      return;
    } else {
      calculator.operator = value;
      return;
    }
  });
});
