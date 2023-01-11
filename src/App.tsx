import React from "react";
import "./App.css";
import words from "./assets/words.json";
import WordList from "./components/wordList/wordList";
import { useTimer } from "./hooks/useTimer";

const App: React.FC = () => {
  const timer = useTimer(60);

  return (
    <div className='container'>
      <h1 className='title'>Type Racer</h1>
      <h2 className='timer'>Timer: {timer}</h2>
      <WordList wordList={words} />
      <input placeholder='Type here...' className='input' type='text'></input>
    </div>
  );
};

export default App;
