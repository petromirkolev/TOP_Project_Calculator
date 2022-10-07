// Global variables
const buttons = [...document.querySelector('.buttons').children];
// const upperDisplay = document.querySelector('.upper-display');
const lowerDisplay = document.querySelector('.lower-display');
let operator;
let operand;
let result;
let memo;
// get user input

// display initial input on both displays

buttons.map((btn) => {
  btn.addEventListener('click', function (e) {
    const [textContent, classList] = [e.target.textContent, e.target.classList];
    lowerDisplay.style.opacity = 1;

    // addToLowerDisplay(currentBtn);
  });
});

// Display the current input on the lower (bigger) calculator display
const addToLowerDisplay = function (input) {
  lowerDisplay.textContent = input;
};

// Display the current input on the upper (smaller) calculator display

// make calculations

// return result

// memo current result

// delete last input

//

const calculate = function (currentNumber, operator = '', result = 0) {
  return result;
};
