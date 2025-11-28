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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-black dark:via-zinc-900 dark:to-zinc-800 text-black dark:text-white transition-all duration-700 ease-out px-4">

      <h1 className="text-6xl font-extrabold mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-sky-300 drop-shadow-lg">
        Tic-Tac-Toe
      </h1>

      {/* Board Container with 3D depth */}
      <div className="grid grid-cols-3 gap-4 bg-zinc-300 dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.25)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform transition-all duration-300 hover:scale-[1.02]">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`
              w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center 
              text-4xl sm:text-5xl font-extrabold rounded-xl border-2 
              transition-all duration-200 select-none

              ${cell === "X"
                ? "text-blue-600 dark:text-blue-400"
                : "text-rose-600 dark:text-rose-400"
              }

              ${winner
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95"
              }

              ${winner && cell !== "" ? "animate-pulse" : ""}
              bg-zinc-100 dark:bg-zinc-900 border-zinc-500 dark:border-zinc-700
            `}
          >
            {cell}
          </button>
        ))}
      </div>

      {/* Status Text */}
      <div className="mt-8 text-3xl font-semibold">
        {winner
          ? winner === "Draw"
            ? (
              <span className="text-amber-600 dark:text-amber-400 animate-fade-in">
                It's a Draw!
              </span>
            )
            : (
              <span className="text-green-600 dark:text-green-400 animate-fade-in">
                Winner: {winner}
              </span>
            )
          : (
            <span>
              Next Player:{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {isXNext ? "X" : "O"}
              </span>
            </span>
          )}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-8 px-10 py-3 text-lg font-semibold 
        bg-gradient-to-r from-blue-600 to-blue-700 
        text-white rounded-xl shadow-lg 
        hover:from-blue-700 hover:to-blue-800 
        active:scale-95 transition-all duration-200"
      >
        Reset Game
      </button>
    </div>
  );
}
