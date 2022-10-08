// Global variables
const buttons = [...document.querySelectorAll('.btn')];
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
let isCalculatorActive = false;
let isFirstOperand = true;
let isSecondOperand = false;
let isOperator = false;
let shouldCalculate = false;
let afterCalc = false;

const operationsController = (btnClass, btnText) => {
  init();
  if (isFirstOperand) storeFirstOperand(btnClass, btnText);
  if (isOperator) storeOperator(btnClass, btnText);
  if (isSecondOperand) storeSecondOperand(btnClass, btnText);
  if (shouldCalculate) calculateResult(btnClass, btnText);
};

const storeFirstOperand = (btnClass, btnText) => {
  if (isFirstOperand && btnClass === 'operand') {
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
buttons.map((btn) => {
  btn.addEventListener('click', function (e) {
    const [btnClass, btnText] = [e.target.classList[1], e.target.textContent];

    switch (btnClass) {
      case 'equal':
        return console.log('equal');
      case 'memo-add':
        memory = firstOperand;
        return;
      case 'memo-remove':
        return console.log('memo-remove');

      // TO DO - make memo restore first operand and proceed to ask for operator
      case 'memo-restore':
        return memoRestore();
      case 'delete':
        return console.log('delete');
      case 'clear':
        return clearCalc();
      case 'operand':
      case 'operator':
        return operationsController(btnClass, btnText);
    }
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
    default:
      break;
  }
};

/////////////
// Helpers //
/////////////
// Initialize display
const init = function () {
  isCalculatorActive = true;
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

// Memorize current result

// Restore result from memoryy

// Delete last input -----------------TO DO------------------
btnDelete.addEventListener('click', () => {});

const memoRestore = function () {
  if (memory.length <= 0) {
    return;
  } else {
    init();
    firstOperand = memory;
    lowerDisplay.textContent = firstOperand;
    isFirstOperand = false;
    isOperator = true;
  }
};
