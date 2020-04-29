import React, { useState, useRef, useCallback, useEffect } from "react";
import "./App.css";

const size = 20;
const rows = 25,
  cols = 50;
const neiShift = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

function App() {
  const [grid, setGrid] = useState(() => {
    return Array.from(Array(rows), () => Array.from(Array(cols), () => false));
  });

  const [isRunning, setIsRunning] = useState(false);

  const isRunningRef = useRef(isRunning);
  useEffect(() => {
    isRunningRef.current = isRunning;
  });

  const gameFrame = useCallback(() => {
    setTimeout(() => {
      if (!isRunningRef.current) {
        return;
      } else {
        setGrid((grid) => {
          return grid.map((row, x) =>
            row.map((cell, y) => {
              let count = 0;
              neiShift.forEach(([dx, dy]) => {
                const shiftedX = x + dx,
                  shiftedY = y + dy;
                if (
                  shiftedX >= 0 &&
                  shiftedX < rows &&
                  shiftedY >= 0 &&
                  shiftedY < cols
                ) {
                  if (grid[shiftedX][shiftedY]) count++;
                }
              });

              if (cell && (count === 2 || count === 3)) return true;
              if (!cell && count === 3) return true;
              return false;
            })
          );
        });
        gameFrame();
      }
    }, 50);
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
          gameFrame();
        }}
      >
        start
      </button>
      <button
        onClick={() => {
          setGrid((grid) => grid.map((x) => x.map((y) => false)));
        }}
      >
        reset
      </button>
      <button
        onClick={() =>
          setGrid((grid) => grid.map((x) => x.map((y) => Math.random() < 0.5)))
        }
      >
        random
      </button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${size}px)`,
        }}
      >
        {grid.map((row, x) =>
          row.map((col, y) => (
            <div
              onClick={() => {
                const swapGrid = [...grid];
                swapGrid[x][y] = !swapGrid[x][y];
                setGrid(swapGrid);
              }}
              key={`${x}${y}`}
              style={{
                width: size,
                height: size,
                border: "1px solid green",
                backgroundColor: col ? "green" : "black",
              }}
            ></div>
          ))
        )}
      </div>
    </>
  );
}

export default App;
