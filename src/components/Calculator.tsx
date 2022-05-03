import { Fragment, useMemo, useState } from "react";
import CalculatorStyles from "./CalculatorStyles";

const calcCells = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const operators = new Set(["+", "-", "÷", "*", "x"]);

const specialChar = new Set(["AC", "+/-", "%", "=", "."]);

export function Calculator() {
  const [inputs, setInputs] = useState<string[]>([]);

  const inputDisplay = useMemo(() => {
    return inputs.join("");
  }, [inputs]);

  const handleClick = (value: string) => {
    const lastValue = inputs[inputs.length - 1];

    let inputsCopy = [...inputs];

    const isNumber = Number.isInteger(Number(value));
    const isLastNumber = Number.isInteger(Number(lastValue));

    if (isNumber) {
      if (isLastNumber) {
        inputsCopy[inputs.length - 1] += value;
      } else {
        inputsCopy.push(value);
      }
    } else if (operators.has(value) && isLastNumber) {
      switch (value) {
        case "x":
          inputsCopy.push("*");
          break;
        case "÷":
          inputsCopy.push("/");
          break;
        default:
          inputsCopy.push(value);
      }
    } else if (specialChar.has(value)) {
      switch (value) {
        case "AC":
          inputsCopy = [];
          break;
        case "+/-":
          if (isLastNumber) {
            inputsCopy[inputsCopy.length - 1] = `${Number(lastValue) * -1}`;
          }
          break;
        case "=":
          inputsCopy = [eval(inputsCopy.join(""))];
          break;
        case "%":
        case ".":
          if (isLastNumber) {
            inputsCopy[inputsCopy.length - 1] += value;
          }
      }
    }

    setInputs(inputsCopy);
  };
  return (
    <CalculatorStyles.Container>
      <CalculatorStyles.Display>{inputDisplay}</CalculatorStyles.Display>
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
