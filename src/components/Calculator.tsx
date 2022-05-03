import { useState } from "react";
import CalculatorStyles from "./CalculatorStyles";

const calcCells = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

export function Calculator() {
  const [display, setDisplay] = useState("0");
  return (
    <CalculatorStyles.Container>
      <CalculatorStyles.Display>{display}</CalculatorStyles.Display>
      <CalculatorStyles.CellsContainer>
        {calcCells.map((row, rowIndex) => {
          return (
            <div key={rowIndex} className="cell">
              {row}
            </div>
          );
        })}
      </CalculatorStyles.CellsContainer>
    </CalculatorStyles.Container>
  );
}
