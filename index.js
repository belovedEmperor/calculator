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

console.log("Add 2 + 3 =", operate(OPERATIONS.add, 2, 3));
console.log("Subtract 5 - 2 =", operate(OPERATIONS.subtract, 5, 2));
console.log("Multiply 4 * 3 =", operate(OPERATIONS.multiply, 4, 3));
console.log("Divide 10 / 2 =", operate(OPERATIONS.divide, 10, 2));
console.log("Invalid operation =", operate("UNKNOWN", 1, 1));
