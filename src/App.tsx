import React from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";
import words from "./assets/words.json";

const App: React.FC = () => {
  const timer = useTimer(60);

  return (
    <div className='container'>
      <h1 className='title'>Type Racer</h1>
      <h2 className='timer'>Timer: {timer}</h2>
      {words.map((word, index) => (
        <h3 key={index}>{word}</h3>
      ))}
    </div>
  );
};

export default App;
