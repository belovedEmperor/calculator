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
  if (operation === OPERATIONS.divide && number2 === 0) {
    return "Really?";
  }

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
let isDecimal = false;
let isOperating = false;

let currentOperation = OPERATIONS.add;

const SWITCH_OPTIONS = {
  mainNumber: true,
  operand: false,
};
let currentNumberSwitch = true;

function appendToNumber(originalNumber, numberToAppend, isDecimal) {
  const originalNumberString = String(originalNumber);
  if (isDecimal === true) {
    numberToAppend = `.${numberToAppend}`;
  }
  return Number(`${originalNumberString}${numberToAppend}`);
}

const numberButtons = document.querySelectorAll("button.number");
for (const button of numberButtons) {
  button.addEventListener("click", (event) => {
    if (isOperating === false) handleClear();
    if (event.currentTarget.dataset.number === ".") {
      isDecimal = true;
      renderToDisplay(
        `${currentNumberSwitch === true ? mainNumber : operand}.`,
      );
      return;
    }
    if (currentNumberSwitch === true) {
      if (isDecimal === true && String(mainNumber).includes("."))
        isDecimal = false;
      mainNumber = appendToNumber(
        mainNumber,
        event.currentTarget.dataset.number,
        isDecimal,
      );
      renderToDisplay(mainNumber);
    } else if (currentNumberSwitch === false) {
      if (isDecimal === true && String(operand).includes("."))
        isDecimal = false;
      operand = appendToNumber(
        operand,
        event.currentTarget.dataset.number,
        isDecimal,
      );
      renderToDisplay(operand);
    }
    if (isDecimal === true) isDecimal = false;
  });
}

const operationButtons = document.querySelectorAll("button.operation");
for (const button of operationButtons) {
  button.addEventListener("click", (event) => {
    currentNumberSwitch = false;
    handleEqual();
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
    isOperating = true;
  });
}

const equalButton = document.querySelector("button.equal");
function handleEqual() {
  if (!operand) renderToDisplay(mainNumber);
  mainNumber = operate(currentOperation, mainNumber, operand);
  renderToDisplay(mainNumber);
  if (typeof mainNumber !== "number") handleClear(false);
  operand = 0;
  isOperating = false;
}
equalButton.addEventListener("click", () => handleEqual());

const clearButton = document.querySelector("button.clear");
function handleClear(clearDisplay) {
  mainNumber = 0;
  operand = 0;
  currentNumberSwitch = true;
  currentOperation = OPERATIONS.add;
  if (clearDisplay) renderToDisplay(mainNumber);
}
clearButton.addEventListener("click", () => handleClear(true));

function renderToDisplay(toBeRendered) {
  if (
    typeof toBeRendered === "number" &&
    !isNaN(toBeRendered) &&
    isFinite(toBeRendered) &&
    !Number.isInteger(toBeRendered)
  )
    toBeRendered = Number(parseFloat(toBeRendered).toFixed(6));
  const resultDisplay = document.querySelector(".display");
  resultDisplay.textContent = toBeRendered;
}
