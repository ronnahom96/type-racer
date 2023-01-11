import React from "react";
import "./App.css";
import { useTimer } from "./hooks/useTimer";

const App: React.FC = () => {
  const timer = useTimer(60);

  return (
    <>
      <h1 className='title'>Type Racer</h1>;
      <h2 className='timer'>Timer: {timer}</h2>
    </>
  );
};

export default App;
