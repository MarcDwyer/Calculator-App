import { Fragment, useMemo, useState } from "react";
import CalculatorStyles from "./CalculatorStyles";
import { evaluate } from "mathjs";

const calcCells = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];
const operators = new Set(["+", "-", "÷", "*", "x"]);

const specialChar = new Set(["AC", "+/-", "="]);

export function Calculator() {
  const [inputs, setInputs] = useState<string[]>([]);

  const inputDisplay = useMemo(() => {
    return inputs.join("");
  }, [inputs]);

  const handleClick = (value: string) => {
    const lastValue = inputs[inputs.length - 1];

    let inputsCopy = [...inputs];

    const isNumber = !isNaN(Number(value));
    const isLastNumber = !isNaN(Number(lastValue));

    if (isNumber) {
      if (isLastNumber || lastValue === ".") {
        inputsCopy[inputs.length - 1] += value;
      } else {
        inputsCopy.push(value);
      }
    } else if (operators.has(value) && !operators.has(lastValue)) {
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
          inputsCopy = [evaluate(inputsCopy.join(""))];
          break;
      }
    } else {
      const lastSymbol = lastValue ? lastValue[lastValue.length - 1] : "";
      if (lastSymbol !== value) {
        switch (value) {
          case "%":
            if (!operators.has(value)) {
              inputsCopy.push(value);
            }
            break;
          case ".":
            if (!inputsCopy.length || operators.has(value)) {
              inputsCopy.push(value);
            } else {
              inputsCopy[inputsCopy.length - 1] += ".";
            }
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
