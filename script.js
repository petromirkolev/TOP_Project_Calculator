// Global variables
const btns = [...document.querySelectorAll('.btn-op')];
const btnClear = document.querySelector('.clear');
const btnMemoAdd = document.querySelector('.memo-add');
const btnMemoRemove = document.querySelector('.memo-remove');
const btnMemoRes = document.querySelector('.memo-restore');
const btnDelete = document.querySelector('.delete');
const lowerDisplay = document.querySelector('.lower-display');
const upperDisplay = document.querySelector('.upper-display');
let firstOperand = '';
let secondOperand = '';
let operator = '';
let memory = '';
let isFirstOperand = true;
let afterCalc = false;
let isOperator = false;
let isSecondOperand = false;
let shouldCalculate = false;
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
  upperDisplay.textContent = firstOperand;
  if (btnClass === 'operator') {
    lowerDisplay.textContent = operator = btnText;
  } else {
    isOperator = false;
    isSecondOperand = true;
  }
};
const storeSecondOperand = (btnClass, btnText) => {
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
  upperDisplay.textContent = firstOperand = calculate(
    firstOperand,
    operator,
    secondOperand
  );
  secondOperand = '';
  afterCalcHelper(btnClass, btnText);
};
const afterCalcHelper = (btnClass, btnText) => {
  shouldCalculate = false;
  afterCalc = true;
  isOperator = true;
  storeOperator(btnClass, btnText);
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
