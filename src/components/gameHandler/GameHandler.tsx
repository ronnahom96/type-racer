/* eslint-disable no-unused-vars */
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';
import words from '../../assets/words.json';
import './GameHandler.css';

const INITIAL_SECONDS = 10;

const GameHandler: React.FC = () => {
  const [isGameActive, setIsGameActive] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [lastChar, setLastChar] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (isGameActive) {
      inputRef.current?.focus();
    }
  }, [isGameActive]);

  const startGame = () => {
    if (!isGameActive) {
      setIsGameActive(true);
      setCharIndex(-1);
      setCorrectChars(0);
      setCorrectWords(0);
      setWordIndex(0);
      setLastChar('');
    }
  };

  const finishGame = () => {
    setIsGameActive(false);
    setInput('');
  };

  const handleType = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case ' ': {
        validateWord();
        setCharIndex(-1);
        setWordIndex(wordIndex + 1);
        setInput('');
        break;
      }
      case 'Backspace': {
        setCharIndex(charIndex - 1);
        setLastChar('');
        break;
      }
      default: {
        setCharIndex(charIndex + 1);
        setLastChar(key);
        break;
      }
    }
  };

  const validateWord = () => {
    if (words[wordIndex] === input) {
      setCorrectWords(correctWords + 1);
    } else {
      setIncorrectWords(incorrectWords + 1);
    }
  };

  const upCorrectChar = () => {
    setCorrectChars(correctChars + 1);
  };

  const upIncorrectChar = () => {
    setIncorrectChars(incorrectChars + 1);
  };

  return (
    <div className="container">
      <h1 className="title">Type Racer</h1>
      {<Timer seconds={INITIAL_SECONDS} isGameActive={isGameActive} finishGame={finishGame} />}
      <WordList
        upCorrectChar={upCorrectChar}
        upIncorrectChar={upIncorrectChar}
        words={words}
        currWordIndex={wordIndex}
        currCharIndex={charIndex}
        lastChar={lastChar}
      />
      <input
        disabled={!isGameActive}
        onKeyDown={handleType}
        ref={inputRef}
        value={input}
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
