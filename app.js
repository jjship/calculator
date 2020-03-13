document.addEventListener('DOMContentLoaded' , () =>{
  const input = document.querySelector('input');
  const controls = document.getElementsByClassName('controls');
  const operators = document.getElementsByClassName('operators');
  const nums = document.getElementsByClassName('nums');
  let calculation = '';
  const nested = document.getElementById('nested')
  function isPoint(ch) { return (ch === ".");}
  function isDigit(ch) { return /\d/.test(ch);}
  function isOperator(ch) { return /\+|-|\*|\/|\^/.test(ch);}



  nested.addEventListener('click', (e) => {
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
    this.value = value
  }

  function tokenize(str) {  
    var result=[]; //array of tokens  
    var buffer=[];
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



console.log(tokenize('22.5+3+5'));
  
});