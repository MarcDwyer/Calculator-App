import { Fragment, useState } from "react";
import CalculatorStyles from "./CalculatorStyles";

const calcCells = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const operators = new Set(["+", "-", "x", "÷", "*"]);

export function Calculator() {
  const [display, setDisplay] = useState<string>("");

  const handleClick = (value: string) => {
    console.log({ value, display });
    if (operators.has(display[display.length - 1]) && operators.has(value)) {
      return;
    } else if (value === "AC") {
      setDisplay("");
    } else if (value === "=") {
      setDisplay(eval(display).toString());
    } else if (value === "x") {
      setDisplay(display + "*");
    } else if (value === "-") {
      setDisplay(display + "-");
    } else if (value === "+") {
      setDisplay(display + "+");
    } else if (value === "÷") {
      setDisplay(display + "/");
    } else if (value === "%") {
      setDisplay(display + "%");
    } else if (value === "+/-") {
      setDisplay(display * -1);
    } else if (value === ".") {
      setDisplay(display + ".");
    } else {
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
