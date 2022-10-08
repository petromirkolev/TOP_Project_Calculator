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
let isFirstOperand = true;
let isSecondOperand = false;
let isOperator = false;
let shouldCalculate = false;
let nextCalculation = false;

//////////////////////////
// Calculator functions //
//////////////////////////
// Delegate function
const operationsController = (btnClass, btnText) => {
  init();
  if (isFirstOperand) storeFirstOperand(btnClass, btnText);
  if (isOperator) storeOperator(btnClass, btnText);
  if (isSecondOperand) storeSecondOperand(btnClass, btnText);
  if (shouldCalculate) calculateResult(btnClass, btnText);
};
// Store first number
const storeFirstOperand = (btnClass, btnText) => {
  if (isFirstOperand && btnClass === 'operand') {
    lowerDisplay.textContent = firstOperand += btnText;
  } else {
    isFirstOperand = false;
    isOperator = true;
  }
};
// Store math operator
const storeOperator = (btnClass, btnText) => {
  upperDisplay.textContent = firstOperand;
  if (btnClass === 'operator') {
    lowerDisplay.textContent = operator = btnText;
  } else {
    isOperator = false;
    isSecondOperand = true;
  }
};
// Store second number
const storeSecondOperand = (btnClass, btnText) => {
  if (nextCalculation) {
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
// Calculate result
const calculateResult = (btnClass, btnText) => {
  upperDisplay.textContent = firstOperand = calculate(
    firstOperand,
    operator,
    secondOperand
  );
  secondOperand = '';
  continueCalculation(btnClass, btnText);
};
// Continue calculation after result
const continueCalculation = (btnClass, btnText) => {
  shouldCalculate = false;
  nextCalculation = true;
  isOperator = true;
  storeOperator(btnClass, btnText);
};
// Reset calculator
const resetCalculator = () => {
  lowerDisplay.style.opacity = 0.3;
  lowerDisplay.textContent = upperDisplay.textContent = '0';
  firstOperand = secondOperand = operator = '';
  isFirstOperand = true;
  isOperator = isSecondOperand = shouldCalculate = false;
};
// Get current result
const getResult = () => {
  let result;
  if (secondOperand.length <= 0 && firstOperand.length !== 0) {
    lowerDisplay.textContent = firstOperand;
  } else {
    result = lowerDisplay.textContent = calculate(
      firstOperand,
      operator,
      secondOperand
    );
    return result;
  }
};

//////////////////
// Memory buttons //
//////////////////
// Add number to memory
const memoAdd = () => {
  memory = lowerDisplay.textContent;
};
// TO DO - Fix bug - When memory is restored the user can add more numbers to stored number i.e. should prevent user from adding more numbers but rather use the restored memo number as operand
// Restore number from memory
const memoRestore = () => {
  if (memory.length <= 0) {
    return;
  } else {
    init();
    if (firstOperand.length === 0) {
      lowerDisplay.textContent = firstOperand = memory;
      isFirstOperand = false;
      isOperator = true;
    } else {
      lowerDisplay.textContent = secondOperand = memory;
      isSecondOperand = false;
      shouldCalculate = true;
    }
  }
};
// Remove number from memory
const memoRemove = () => {
  memory = '';
};

//////////////////////
// Helper functions //
//////////////////////
// Initialize display
const init = function () {
  lowerDisplay.style.opacity = 1;
};
// Calculate result helper function
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

////////////////////////////////////////////
// Current button pressed event delegator //
////////////////////////////////////////////
buttons.map((btn) => {
  btn.addEventListener('click', function (e) {
    const [btnClass, btnText] = [e.target.classList[1], e.target.textContent];

    if (btnClass === 'operator' && firstOperand === '') return;

    switch (btnClass) {
      case 'equal':
        return getResult();
      case 'memo-add':
        return memoAdd();
      case 'memo-remove':
        return memoRemove();
      case 'memo-restore':
        return memoRestore();
      case 'delete':
        return console.log('delete');
      case 'clear':
        return resetCalculator();
      case 'operand':
      case 'operator':
        return operationsController(btnClass, btnText);
    }
  });
});
