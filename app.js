const buttonValues = [
  ['num', '0'],
  ['num', '1'],
  ['num', '2'],
  ['num', '3'],
  ['num', '4'],
  ['num', '5'],
  ['num', '6'],
  ['num', '7'],
  ['num', '8'],
  ['num', '9'],
  ['num', '.'],
  ['operator', '+'],
  ['operator', '-'],
  ['operator', '*'],
  ['operator', '/'],
  ['operator', '='],
]
console.log(buttonValues[0]);
const input = document.querySelector('input');
const controls = document.getElementsByClassName('controls');
const operators = document.getElementsByClassName('operators');
const nums = document.getElementsByClassName('nums');
const nested = document.getElementById('nested');
let calculation = '';
function isPoint(ch) { return (ch === ".");}
function isDigit(ch) { return /\d/.test(ch);}
function isOperator(ch) { return /\+|-|\*|\/|\^/.test(ch);}
function addButtons(array) {
  array.forEach((item) => {
    let newButton = document.createElement("button");
    newButton.className = item[0];
    newButton.id = item[1];
    newButton.innerHTML = item[1];
    nested.appendChild(newButton);
  });
}
addButtons(buttonValues);



nested.addEventListener('click', (e) => { //callback jako osobna funkcja dla czytelności, osobne eventlistenery i callbacki dla operatorów i numerów
  if (e.target.className === 'nums') {
    let num = e.target.innerText;
    calculation += num;

  } else if (e.target.className === 'operators') {
    let operator = e.target.innerText;
    calculation += operator;

  }
});
//defining Token class
function Token(type, value) {   
  this.type = type;   
  this.value = value;
}

function tokenize(str) {  
  var result=[]; //array of tokens  
  var buffer=[];//ostatnia cyfra zostaje w buforze
  str=str.split("");  
  console.log(str);
  str.forEach(function (char, idx) {    
    if(isDigit(char)||isPoint(char)) {  
      buffer.push(char);    
    } else if (isOperator(char)) {   
      result.push(new Token("Literal", buffer.join('')));  
      buffer =[];  
      result.push(new Token("Operator", char));     
    }   
  });
  return result;
};
      

// digit => push ch to NB  
// decimal point => push ch to NB  
//operator => join NB contents as one Literal and push to result 



console.log(tokenize('22.5+3+5')); //doesn't get last digit..
  
