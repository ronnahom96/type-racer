/* eslint-disable no-unused-vars */
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';
import './GameHandler.css';

const INITIAL_SECONDS = 60;

const GameHandler: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState(false);

  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [lastChar, setLastChar] = useState('')
  const inputRef = useRef(null);

  const [input, setInput] = useState('');

  useEffect(() => {
    if (isGameActive) {
      // Todo focus
      // inputRef?.current.focus();
    }
  }, [isGameActive]);

  const startGame = () => {
    if (!isGameActive) {
      setIsGameActive(true);
      setCharIndex(-1);
      setCorrectChars(0);
      setCorrectWords(0);
      setWordIndex(0);
      setLastChar('')
    }
  };

  const finishGame = () => {
    setIsGameActive(false);
  };

  const handleType = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case ' ': {
        // Todo: Space bar logic
        setCharIndex(-1);
        setWordIndex(wordIndex + 1);
        setInput('');
        break;
      }
      case 'Enter': {
        // Todo: enter logic
        break;
      }
      case 'Backspace': {
        // Todo: backspace logic
        break;
      }
      default: {
        // Todo: default
        break;
      }
    }
  };

  return (
    <div className="container">
      <h1 className="title">Type Racer</h1>
      <Timer seconds={INITIAL_SECONDS} isGameActive={isGameActive} finishGame={finishGame} />
      <WordList currWordIndex={wordIndex} currCharIndex={charIndex} lastChar={input} />
      <input
        disabled={!isGameActive}
        onKeyDown={handleType}
        ref={inputRef}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        className="type-btn"
        type="text"
      />
      <input disabled={isGameActive} placeholder="Start Game" onClick={startGame} className="start-btn" type="button" value="Start` Game" />
      <Statistics correctWords={correctWords} incorrectWords={incorrectWords} correctChars={correctChars} />
    </div>
  );
};

export default GameHandler;
