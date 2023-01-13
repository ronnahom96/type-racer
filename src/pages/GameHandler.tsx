import React, { useState } from "react";
import Timer from "../components/timer/Timer";
import WordList from "../components/wordList/WordList";

const GameHandler: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const INITIAL_SECONDS = 60;

  return (
    <div className='container'>
      <h1 className='title'>Type Racer</h1>
      <Timer seconds={INITIAL_SECONDS} isGameActive={isGameActive} />
      <WordList />
    </div>
  );

  //         <WordList wordList={words} />
  //         <input placeholder='Type here...' className='input' type='text'></input>
  //       </>) : (
  //       <GameOver handlePlayAgain={() => startOverTimer()} />
  //     )}
  //   </div>
  // );
};

export default GameHandler;
