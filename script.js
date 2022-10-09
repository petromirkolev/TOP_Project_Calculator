// === Global variables === //
const buttons = [...document.querySelectorAll('.btn')],
  btnClear = document.querySelector('.clear'),
  btnMemoAdd = document.querySelector('.memo-add'),
  btnMemoRemove = document.querySelector('.memo-remove'),
  btnMemoRes = document.querySelector('.memo-restore'),
  btnDelete = document.querySelector('.delete'),
  lowerDisplay = document.querySelector('.lower-display'),
  upperDisplay = document.querySelector('.upper-display');
let firstOperand = '',
  secondOperand = '',
  operator = '',
  memory = '',
  isFirstOperand = true,
  isSecondOperand = false,
  isOperator = false,
  shouldCalculate = false,
  nextCalculation = false,
  btnClass,
  btnText;
// === Event listeners === //
// Delegate function based on button clicked
buttons.map((btn) => {
  btn.addEventListener('click', function (e) {
    [btnClass, btnText] = [e.target.classList[1], e.target.textContent];
    buttonListener(btnClass, btnText);
  });
});
// Delegate function based on button pressed
document.addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'Backspace':
      return deleteLastInput();

    // TO DO rest of operations
  }
});

// === Calculator functions === //
// == Invoked by button listener == //
// Button event delegator
const buttonListener = (btnClass, btnText) => {
  if (btnClass === 'operator' && firstOperand === '') return;

  switch (btnClass) {
    case 'equal':
      return firstOperand.length > 0 ? getResult() : resetCalculator();
    case 'memo-add':
      return memoAdd();
    case 'memo-remove':
      return memoRemove();
    case 'memo-restore':
      return memoRestore();
    case 'delete':
      return deleteLastInput();
    case 'clear':
      return resetCalculator();
    case 'operand':
    case 'operator':
      return operationsController(btnClass, btnText);
  }
};
// Button event function controller
const operationsController = (btnClass, btnText) => {
  init();
  if (isFirstOperand) {
    if (firstOperand.length <= 0) lowerDisplay.textContent = '';
    storeFirstOperand(btnClass, btnText);
  }
  if (isOperator) storeOperator(btnClass, btnText);
  if (isSecondOperand) storeSecondOperand(btnClass, btnText);
  if (shouldCalculate) calculateResult(btnClass, btnText);
};
// Continue calculation after initial result
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
// Delete last input
const deleteLastInput = () => {
  if (isOperator) return;
  if (isFirstOperand)
    firstOperand = lowerDisplay.textContent = lowerDisplay.textContent.slice(
      0,
      -1
    );
  if (isSecondOperand) {
    secondOperand = lowerDisplay.textContent = lowerDisplay.textContent.slice(
      0,
      -1
    );
  }
};
// Add number to memory
const memoAdd = () => {
  if (isOperator) return;
  memory = lowerDisplay.textContent;
};
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

// == Invoked by operationsController == //
// Store first number
const storeFirstOperand = (btnClass, btnText) => {
  if (isFirstOperand && btnClass === 'operand') {
    firstOperand = lowerDisplay.textContent += btnText;
  } else {
    isFirstOperand = false;
    isOperator = true;
  }
};
// Store math operator
const storeOperator = (btnClass, btnText) => {
  upperDisplay.textContent = firstOperand;
  // Prevent clicking a number after memo restore
  if (operator.length <= 0 && btnClass === 'operand') {
    return;
  } else {
    // Handle operator assignment logic
    if (btnClass === 'operator') {
      lowerDisplay.textContent = operator = btnText;
    } else {
      lowerDisplay.textContent = '';
      isOperator = false;
      isSecondOperand = true;
    }
  }
};
// Store second number
const storeSecondOperand = (btnClass, btnText) => {
  if (btnClass === 'operand') {
    secondOperand = lowerDisplay.textContent += btnText;
  } else {
    isSecondOperand = false;
    shouldCalculate = true;
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

// === Helper functions === //
// Power on calculator
const powerOn = () => {
  lowerDisplay.textContent = upperDisplay.textContent = '0';
};
// Initialize display
const init = () => {
  lowerDisplay.style.opacity = 1;
};
// Calculate result helper function
const calculate = (firstOperand = 0, operator = '', secondOperand = 0) => {
  switch (operator) {
    case '+':
      return +firstOperand + +secondOperand;
    case '-':
      return +firstOperand - +secondOperand;
    case '*':
      return +firstOperand * +secondOperand;
    case '/':
      if (+secondOperand !== 0) {
        return +firstOperand / +secondOperand;
      } else {
        resetCalculator();
        init();
        return (lowerDisplay.textContent = 'Error');
      }
    default:
      return;
  }
};

powerOn();
