import { Fragment, useState } from "react";
import CalculatorStyles from "./CalculatorStyles";

const calcCells = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const operators = new Set(["+", "-", "÷", "*", "x"]);

export function Calculator() {
  const [display, setDisplay] = useState<string>("");

  const handleClick = (value: string) => {
    const lastChar = display[display.length - 1];
    const isOperator = operators.has(value);

    // Checks to see if adding an operator with no number before it.
    // As well as checking to see if last character is an operator
    if (
      (!display.length && isOperator) ||
      (isOperator && operators.has(lastChar))
    ) {
      return;
    }

    switch (value) {
      case "AC":
        setDisplay("");
        break;
      case "+/-":
        setDisplay((Number(display) * -1).toString());
        break;
      case "=":
        setDisplay(eval(display).toString());
        break;
      case "x":
        setDisplay(display + "*");
        break;
      default:
        setDisplay(display + value);
    }
  };

  return (
    <CalculatorStyles.Container>
      <CalculatorStyles.Display>{display}</CalculatorStyles.Display>
      <CalculatorStyles.CellsContainer>
        {calcCells.map((row, rowIndex) => {
          return (
            <Fragment key={rowIndex}>
              {row.map((cell, cellIndex) => {
                return (
                  <CalculatorStyles.Cell
                    key={`${rowIndex}${cellIndex}`}
                    onClick={() => handleClick(cell)}
                  >
                    <span>{cell}</span>
                  </CalculatorStyles.Cell>
                );
              })}
            </Fragment>
          );
        })}
      </CalculatorStyles.CellsContainer>
    </CalculatorStyles.Container>
  );
}
