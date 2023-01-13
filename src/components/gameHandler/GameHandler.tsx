/* eslint-disable no-unused-vars */
import React, { KeyboardEvent, useState } from 'react';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';

const INITIAL_SECONDS = 60;

const GameHandler: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState(false);

  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);

  const [input, setInput] = useState('');

  const startGame = () => {
    if (!isGameActive) {
      setIsGameActive(true);
      setCharIndex(0);
      setWordIndex(0);
    }
  };

  const handleType = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case(' '): {
        // Todo: Space bar logic
        setCharIndex(-1);
        setWordIndex( wordIndex + 1 );
        setInput('');
        break;
      }
      case('Enter'): {
        // Todo: enter logic
        break;
      }
      case('Backspace'): {
        // Todo: backspace logic
        break;
      }
      default:{
        // Todo: default
        break;
      }
     }
  };

  return (
    <div className="container">
      <h1 className="title">Type Racer</h1>
      <Timer seconds={INITIAL_SECONDS} isGameActive={isGameActive} />
      <WordList />
      <input
        onKeyDown={handleType}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        className="type-btn"
        type="text"
      />
      <input placeholder="Start Game" onClick={startGame} className="start-btn" type="button" value="Start` Game" />
      <Statistics seconds={INITIAL_SECONDS} correctWords={correctWords} incorrectWords={incorrectWords} correctChars={correctChars} />
    </div>
  );
};

export default GameHandler;
