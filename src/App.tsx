import React from "react";
import "./App.css";
import words from "./assets/words.json";
import GameOver from "./components/gameOver/GameOver";
import WordList from "./components/wordList/WordList";
import { useTimer } from "./hooks/useTimer";

const App: React.FC = () => {
  const [timer, isTimerActive, startOverTimer] = useTimer(2);

  return (
    <div className='container'>
      <h1 className='title'>Type Racer</h1>
      <h2 className='timer'>Timer: {timer}</h2>
      {isTimerActive ? (
        <>
          <WordList wordList={words} />
          <input placeholder='Type here...' className='input' type='text'></input>
        </>) : (
        <GameOver handlePlayAgain={() => startOverTimer()} />
      )}
    </div>
  );
};

export default App;
