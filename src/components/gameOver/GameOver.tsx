import React from "react";
import Statistics from "../statistics/Statistics";
import "./gameOver.css";

interface GameOverProps {
  handlePlayAgain: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ handlePlayAgain }) => {
  return (
    <div className="game-over-container">
      <h4>Game over</h4>
      <Statistics></Statistics>
      <input type='button' className="play-again-button" onClick={handlePlayAgain} value="Play Again" />
    </div>
  );
};

export default GameOver;
