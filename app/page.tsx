"use client"; // Enables the component to run on the client side in a Next.js app

import { useState } from "react"; // Importing useState hook from React to manage component state

export default function Home() {
  // State to track the board (array of 9 cells, initially empty)
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));

  // State to track whose turn it is (true for X, false for O)
  const [isXNext, setIsXNext] = useState(true);

  // State to track the winner (either "X", "O", or "Draw")
  const [winner, setWinner] = useState<string | null>(null);

  // Function to handle click events on the board cells
  const handleClick = (index: number) => {
    // Prevent clicking on an already occupied cell or if a winner is already determined
    if (board[index] || winner) return;

    // Create a new board by copying the current board and updating the clicked cell
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O"; // Assign "X" or "O" based on the current turn
    setBoard(newBoard); // Update the board state

    // Toggle the turn between X and O
    setIsXNext(!isXNext);

    // Check if there's a winner after the move
    const win = checkWinner(newBoard);
    if (win) setWinner(win); // If there's a winner, update the winner state
  };

  // Function to check the winner of the game
  const checkWinner = (squares: string[]) => {
    // Define all the possible winning lines (combinations of indexes)
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

    // Loop through each winning line and check if the cells are the same (and not empty)
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]; // Return the winner ("X" or "O")
      }
    }

    // If there are no empty cells left, the game is a draw
    if (!squares.includes("")) return "Draw";

    // If no winner and the game isn't a draw, return null
    return null;
  };

  // Function to reset the game
  const resetGame = () => {
    setBoard(Array(9).fill("")); // Reset the board to an empty state
    setIsXNext(true); // Reset the turn to X
    setWinner(null); // Clear any winner state
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-zinc-100 via-zinc-200 to-zinc-300 dark:from-black dark:via-zinc-900 dark:to-zinc-800 text-black dark:text-white transition-all duration-700 ease-out px-4">

      {/* Title of the game */}
      <h1 className="text-6xl font-extrabold mb-10 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-sky-300 drop-shadow-lg">
        Tic-Tac-Toe
      </h1>

      {/* Board Container */}
      <div className="grid grid-cols-3 gap-4 bg-zinc-300 dark:bg-zinc-800 p-6 rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.25)] dark:shadow-[0_10px_25px_rgba(0,0,0,0.6)] transform transition-all duration-300 hover:scale-[1.02]">
        {/* Map over the board array to render each cell as a button */}
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)} // Handle click for this cell
            className={`
              w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center 
              text-4xl sm:text-5xl font-extrabold rounded-xl border-2 
              transition-all duration-200 select-none

              ${cell === "X"
                ? "text-blue-600 dark:text-blue-400"
                : "text-rose-600 dark:text-rose-400"
              }

              // Disable clicking after game is over and apply hover and active styles
              ${winner
                ? "cursor-not-allowed opacity-60"
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:scale-110 active:scale-95"
              }

              // Add animation for non-empty cells if there's a winner
              ${winner && cell !== "" ? "animate-pulse" : ""}

              bg-zinc-100 dark:bg-zinc-900 border-zinc-500 dark:border-zinc-700
            `}
          >
            {cell} {/* Display the current value of the cell ("X" or "O") */}
          </button>
        ))}
      </div>

      {/* Status Text (show current player's turn or winner) */}
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

      {/* Reset Button to start a new game */}
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
