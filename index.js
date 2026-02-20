const OPERATIONS = {
  add: "ADD",
  subtract: "SUBTRACT",
  multiply: "MULTIPLY",
  divide: "DIVIDE",
};

function add(number1, number2) {
  return number1 + number2;
}

function subtract(number1, number2) {
  return number1 - number2;
}

function multiply(number1, number2) {
  return number1 * number2;
}

function divide(number1, number2) {
  return number1 / number2;
}

let userNumber1;
let operation;
let userNumber2;

function operate(operation, number1, number2) {
  switch (true) {
    case operation === OPERATIONS.add:
      return add(number1, number2);
    case operation === OPERATIONS.subtract:
      return subtract(number1, number2);
    case operation === OPERATIONS.multiply:
      return multiply(number1, number2);
    case operation === OPERATIONS.divide:
      return divide(number1, number2);
    default:
      return NaN;
  }
}

let mainNumber = 0;
let operand = 0;

let currentOperation = OPERATIONS.add;

const SWITCH_OPTIONS = {
  mainNumber: true,
  operand: false,
};
let currentNumberSwitch = true;

function appendToNumber(originalNumber, numberToAppend) {
  return Number(`${String(originalNumber)}${String(numberToAppend)}`);
}

const numberButtons = document.querySelectorAll("button.number");
for (const button of numberButtons) {
  button.addEventListener("click", (event) => {
    if (currentNumberSwitch === true) {
      mainNumber = appendToNumber(
        mainNumber,
        event.currentTarget.dataset.number,
      );
      renderToDisplay(mainNumber);
    } else if (currentNumberSwitch === false) {
      operand = appendToNumber(operand, event.currentTarget.dataset.number);
      renderToDisplay(operand);
    }
  });
}

const operationButtons = document.querySelectorAll("button.operation");
for (const button of operationButtons) {
  button.addEventListener("click", (event) => {
    currentNumberSwitch = false;
    switch (true) {
      case event.currentTarget.dataset.operation === "add":
        currentOperation = OPERATIONS.add;
        break;
      case event.currentTarget.dataset.operation === "subtract":
        currentOperation = OPERATIONS.subtract;
        break;
      case event.currentTarget.dataset.operation === "multiply":
        currentOperation = OPERATIONS.multiply;
        break;
      case event.currentTarget.dataset.operation === "divide":
        currentOperation = OPERATIONS.divide;
        break;
      default:
        console.error("Failed to change operation");
    }
  });
}

const resultDisplay = document.querySelector(".display");
function renderToDisplay(toBeRendered) {
  resultDisplay.textContent = toBeRendered;
}

const equalButton = document.querySelector("button.equal");
equalButton.addEventListener("click", (event) => {
  if (!operand) resultDisplay.textContent = mainNumber;
  renderToDisplay(operate(currentOperation, mainNumber, operand));
});

const clearButton = document.querySelector("button.clear");
clearButton.addEventListener("click", (event) => {
  mainNumber = 0;
  operand = 0;
  currentNumberSwitch = true;
  renderToDisplay(mainNumber);
});
