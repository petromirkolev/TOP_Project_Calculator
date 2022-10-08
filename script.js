// Global variables
const btns = [...document.querySelectorAll('.btn-op')];
const btnClear = document.querySelector('.clear');
const btnMemoAdd = document.querySelector('.memo-add');
const btnMemoRemove = document.querySelector('.memo-remove');
const btnMemoRes = document.querySelector('.memo-restore');
const btnDelete = document.querySelector('.delete');
const lowerDisplay = document.querySelector('.lower-display');
const upperDisplay = document.querySelector('.upper-display');
let display = '';
let firstOperand = '';
let secondOperand = '';
let operator = '';
let memory = '';
let result = '';
let isFirstOperand = true;
let afterCalc = false;
let isOperator = false;
let isSecondOperand = false;
let shouldCalculate = false;
let checkNextMove = false;
let isEqual = false;
let counter = 1;

const controller = (btnClass, btnText) => {
  if (isEqual) console.log('asd');
  if (isFirstOperand) storeFirstOperand(btnClass, btnText);
  if (isOperator) storeOperator(btnClass, btnText);
  if (isSecondOperand) storeSecondOperand(btnClass, btnText);
  if (shouldCalculate) calculateResult(btnClass, btnText);
};

const storeFirstOperand = (btnClass, btnText) => {
  if (isFirstOperand && btnClass === 'operand') {
    init();
    lowerDisplay.textContent = firstOperand += btnText;
  } else {
    isFirstOperand = false;
    isOperator = true;
  }
};
const storeOperator = (btnClass, btnText) => {
  // if (btnClass === 'operator') {
  //   isOperator;
  // } else {
  //   shouldCalculate = false;
  //   secondOperand = '';
  //   isSecondOperand = true;
  // }

  // TO DO - fix - after calculation when we want to store operator again, when operator button is pressed it does not get updated immediately in the calculator, you have to press it twice
  if (afterCalc) {
    console.log('operator after calc');

    if (btnClass === 'operator') {
      console.log('operator after calc 111');

      lowerDisplay.textContent = operator = btnText;
    }
    if (btnClass === 'operand' && operator.length > 0) {
      console.log('operator after calc 222');

      isOperator = false;
      isSecondOperand = true;
    }
  } else {
    upperDisplay.textContent = firstOperand;
    if (btnClass === 'operator') {
      lowerDisplay.textContent = operator = btnText;
    } else {
      isOperator = false;
      isSecondOperand = true;
    }
  }
};
const storeSecondOperand = (btnClass, btnText) => {
  console.log('store second op');

  if (afterCalc) {
    if (btnClass === 'operand') {
      lowerDisplay.textContent = secondOperand += btnText;
    }
    if (btnClass === 'operator' && secondOperand.length > 0) {
      isSecondOperand = false;
      shouldCalculate = true;
    }
  } else {
    if (btnClass === 'operand') {
      lowerDisplay.textContent = secondOperand += btnText;
    } else {
      isSecondOperand = false;
      shouldCalculate = true;
    }
  }
};
const calculateResult = (btnClass, btnText) => {
  console.log('calc');
  upperDisplay.textContent =
    firstOperand =
    result =
      calculate(firstOperand, operator, secondOperand);

  afterCalc = true;
  shouldCalculate = false;
  isOperator = true;
  secondOperand = operator = '';

  // if (btnClass === 'operator') {
  //   isOperator;
  // } else {
  //   shouldCalculate = false;
  //   secondOperand = '';
  //   isSecondOperand = true;
  // }
};

// Numerical buttons handler
btns.map((btn) => {
  btn.addEventListener('click', function (e) {
    const [btnClass, btnText] = [e.target.classList[2], e.target.textContent];

    controller(btnClass, btnText);
  });
});

const calculate = function (
  firstOperand = 0,
  operator = '',
  secondOperand = 0
) {
  switch (operator) {
    case '+':
      return +firstOperand + +secondOperand;
    case '-':
      return +firstOperand - +secondOperand;
    case '*':
      return +firstOperand * +secondOperand;
    case '/':
      return +firstOperand / +secondOperand;
    case '=':
      alert('cannot calculate');
      clearCalc();
      break;
    default:
      return firstOperand;
  }
};

/////////////
// Helpers //
/////////////
// Initialize display
const init = function () {
  lowerDisplay.style.opacity = 1;
};
// Prevent start with operator
// const isNotOperator = function (input) {
//   if (input === 'operator' && firstOperand.length < 1)
//     return alert('Start with num');
// };
// Clear calculator
const clearCalc = function () {
  lowerDisplay.style.opacity = 0.3;
  lowerDisplay.textContent = '0';
  upperDisplay.textContent = '0';
  firstOperand = secondOperand = operator = '';
  isFirstOperand = true;
  isOperator = false;
  isSecondOperand = false;
  shouldCalculate = false;
  checkNextMove = false;
};

/////////////////////
// Event listeners //
/////////////////////
// Clear calculator display and memory
btnClear.addEventListener('click', clearCalc);
// Memorize current result
btnMemoAdd.addEventListener('click', () => {
  memory = display;
});
// Restore result from memoryy
btnMemoRes.addEventListener('click', () => {
  lowerDisplay.textContent = memory;
});
// Delete last input -----------------TO DO------------------
btnDelete.addEventListener('click', () => {});
