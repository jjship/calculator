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
  onDisplay: 0,
  firstNum: null,
  operator: null,
  waitingForSecondNum: false,
  secondNum: null
};
const buttonsWrapper = document.getElementById("buttons");
// let input = "";

function isPoint(ch) {
  return ch === ".";
}
function isDigit(ch) {
  return /\d/.test(ch);
}
function isOperator(ch) {
  return /\+|-|\*|\/|\=/.test(ch);
}
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
//defining Token class
// function Token(type, value) {
//   this.type = type;
//   this.value = value;
// }

appendButtonsToWrapper(buttonsArray, buttonsWrapper);

const digits = document.querySelectorAll(".digit");
digits.forEach(button => {
  button.addEventListener("click", e => {
    let value = e.target.innerText;
    let { firstNum, onDisplay, waitingForSecondNum, secondNum } = calculator;
    if (!firstNum) {
      calculator.firstNum = parseFloat(value);
      calculator.onDisplay = value;
      console.log(calculator);
      return;
    }
    if (!waitingForSecondNum) {
      calculator.onDisplay += value;
      calculator.firstNum = parseFloat(calculator.onDisplay);
      console.log(calculator);
      return;
    }
    if (waitingForSecondNum && !secondNum) {
      calculator.secondNum = parseFloat(value);
      calculator.onDisplay = value;
      console.log(calculator);
      return;
    }
    if (waitingForSecondNum && secondNum) {
      calculator.onDisplay += value;
      calculator.secondNum = parseFloat(calculator.onDisplay);
      console.log(calculator);
      return;
    }
    console.log(calculator);
  });
});

const point = document.querySelector(".point");
point.addEventListener("click", e => {
  const value = e.target.innerText;
  const { firstNum, onDisplay, waitingForSecondNum, secondNum } = calculator;
  if (!firstNum) {
    calculator.firstNum = parseFloat(value);
    calculator.onDisplay = value;
    console.log(calculator);
    return;
  }
  if (!secondNum) {
    //what about digit with no 0?
    if (firstNum.includes(value)) {
      return;
    } else {
      calculator.onDisplay += value;
      calculator.firstNum = parseFloat(calculator.onDisplay);
      console.log(calculator);
      return;
    }
  }
  if (secondNum) {
    if (secondNum.includes(value)) {
      return;
    } else {
      calculator.onDisplay += value;
      calculator.secondNum = parseFloat(calculator.onDisplay);
      console.log(calculator);
      return;
    }
  }
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
  button.addEventListener("click", e => {
    const value = e.target.innerText;
    const {
      firstNum,
      onDisplay,
      operator,
      waitingForSecondNum,
      secondNum
    } = calculator;
    if (!firstNum) {
      return;
    }
    if (!secondNum) {
      //(what if the operator is before a digit?)
      calculator.operator = value;
      calculator.waitingForSecondNum = true;
      console.log(calculator);
      return;
    }
    if (secondNum) {
      const result = calculate[operator](firstNum, secondNum);
      calculator.onDisplay = String(result);
      calculator.firstNum = result;
      calculator.operator = null;
      calculator.waitingForSecondNum = true;
      calculator.secondNum = null;
      console.log(calculator);
      return;
    }
  });
});

const calculate = {
  "+": (firstNum, secondNum) => firstNum + secondNum,
  "-": (firstNum, secondNum) => firstNum - secondNum,
  "*": (firstNum, secondNum) => firstNum * secondNum,
  "/": (firstNum, secondNum) => firstNum / secondNum,
  "=": (firstNum, secondNum) => secondNum
};

// function tokenize(str) {
//   var result = []; //array of tokens
//   var buffer = [];
//   str = str.split("");
//   str.forEach(function(char, idx) {
//     if (isDigit(char) || isPoint(char)) {
//       buffer.push(char);
//     }
//     if (isOperator(char)) {
//       //operator => join buffer contents as one Literal and push to result
//       result.push(new Token("Literal", buffer.join("")));
//       buffer = [];
//       result.push(new Token("Operator", char));
//     }
//   });
//   //join buffer contents as one Literal and push to result after last operator
//   if (buffer) {
//     result.push(new Token("Literal", buffer.join("")));
//     buffer = [];
//   }
//   return result;
// }
