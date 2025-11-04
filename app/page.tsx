"use client";

import { useState } from "react";

export default function Home() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const win = checkWinner(newBoard);
    if (win) setWinner(win);
  };

  const checkWinner = (squares: string[]) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    if (!squares.includes("")) return "Draw";
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-black dark:via-zinc-900 dark:to-zinc-800 text-black dark:text-white transition-colors duration-500">
      <h1 className="text-5xl font-extrabold mb-8 tracking-tight text-blue-700 dark:text-blue-400 drop-shadow-md">
        Tic-Tac-Toe
      </h1>

      <div className="grid grid-cols-3 gap-4 bg-zinc-300 dark:bg-zinc-800 p-5 rounded-xl shadow-lg">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`w-24 h-24 flex items-center justify-center text-4xl font-bold rounded-lg border-2 transition-all duration-200 ${cell === "X"
              ? "text-blue-600 dark:text-blue-400"
              : "text-rose-600 dark:text-rose-400"
              } ${winner
                ? "cursor-not-allowed opacity-70"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-105"
              } border-zinc-500 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900`}
          >
            {cell}
          </button>
        ))}
      </div>

      <div className="mt-6 text-2xl font-medium">
        {winner
          ? winner === "Draw"
            ? <span className="text-amber-600 dark:text-amber-400">It's a Draw!</span>
            : <span className="text-green-600 dark:text-green-400">Winner: {winner}</span>
          : <span>Next Player: <span className="font-bold text-blue-600 dark:text-blue-400">{isXNext ? "X" : "O"}</span></span>}
      </div>

      <button
        onClick={resetGame}
        className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 shadow-md transition-all duration-200"
      >
        Reset Game
      </button>
    </div>
  );
}
