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
const buttonsWrapper = document.getElementById("buttons");
let input = "";

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
    if (isDigit(item) || isPoint(item)) {
      newButton.className = "num";
    } else if (isOperator(item)) {
      newButton.className = "operator";
    }
    buttonsWrapper.appendChild(newButton);
  });
}
//defining Token class
function Token(type, value) {
  this.type = type;
  this.value = value;
}

appendButtonsToWrapper(buttonsArray, buttonsWrapper);

const nums = document.querySelectorAll(".num");
nums.forEach(button => {
  button.addEventListener("click", e => {
    let num = e.target.innerText;
    input += num;
    console.log(input);
  });
});

const operators = document.querySelectorAll(".operator");
operators.forEach(button => {
  button.addEventListener("click", e => {
    let operator = e.target.innerText;
    input += operator;
    console.log(input);
  });
});

function tokenize(str) {
  var result = []; //array of tokens
  var buffer = [];
  str = str.split("");
  str.forEach(function(char, idx) {
    if (isDigit(char) || isPoint(char)) {
      buffer.push(char);
    }
    if (isOperator(char)) {
      //operator => join buffer contents as one Literal and push to result
      result.push(new Token("Literal", buffer.join("")));
      buffer = [];
      result.push(new Token("Operator", char));
    }
  });
  //join buffer contents as one Literal and push to result after last operator
  if (buffer) {
    result.push(new Token("Literal", buffer.join("")));
    buffer = [];
  }
  return result;
}
