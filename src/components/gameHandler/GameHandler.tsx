/* eslint-disable no-unused-vars */
import React, { KeyboardEvent, useEffect, useRef, useState, useMemo } from 'react';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';
import wordsAsset from '../../assets/words.json';
import { GameStatus } from '../../common/types';
import './GameHandler.css';
import { StatisticsData, TypeState } from '../../common/interfaces';

const INITIAL_SECONDS = 10;

const GameHandler: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [statisticsData, setStatisticsData] = useState<StatisticsData>({
    correctChars: 0,
    correctWords: 0,
    incorrectWords: 0
  });
  const [typeState, setTypeState] = useState<TypeState>({ wordIndex: 0, charIndex: 0, lastChar: '' });
  const [charClassMap, setCharClassMap] = useState<Record<string, string>>({});
  const words = useMemo(() => wordsAsset.sort(() => Math.random() - 0.5), [gameStatus]);

  const isGameActive = () => gameStatus === 'active';

  useEffect(() => {
    if (isGameActive()) {
      inputRef.current?.focus();
    }
  }, [gameStatus]);

  const startGame = () => {
    if (!isGameActive()) {
      setGameStatus('active');
      resetGameData();
    }
  };

  const resetGameData = () => {
    setTypeState((typeState) => ({ ...typeState, wordIndex: 0, charIndex: -1, lastChar: '' }));
    setCharClassMap({});
    setStatisticsData((statisticsData) => ({
      ...statisticsData,
      correctChars: 0,
      correctWords: 0,
      incorrectChars: 0,
      incorrectWords: 0
    }));
  };

  const endGame = () => {
    setGameStatus('not active');
    setInput('');
  };

  const handleType = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    switch (key) {
      case ' ': {
        checkWord();
        setTypeState((typeState) => ({ ...typeState, wordIndex: typeState.wordIndex + 1, charIndex: -1, lastChar: '' }));
        setInput('');
        break;
      }
      case 'Backspace': {
        setTypeState((typeState) => ({ ...typeState, charIndex: typeState.charIndex - 1, lastChar: '' }));
        break;
      }
      default: {
        setTypeState((typeState) => ({ ...typeState, charIndex: typeState.charIndex + 1, lastChar: key }));
        let className = '';
        if (words[typeState.wordIndex][typeState.charIndex + 1] === key) {
          className = 'success';
          upCorrectChar();
        } else {
          className = 'wrong';
        }

        setCharClassMap((charClassMap) => ({ ...charClassMap, [`${typeState.wordIndex},${typeState.charIndex + 1}`]: className }));
        break;
      }
    }
  };

  const checkWord = () => {
    if (words[typeState.wordIndex] === input.trim()) {
      setStatisticsData((statisticsData) => ({ ...statisticsData, correctWords: statisticsData.correctWords + 1 }));
    } else {
      setStatisticsData((statisticsData) => ({ ...statisticsData, incorrectWords: statisticsData.incorrectWords + 1 }));
      setCharClassMap((charClassMap) => {
        const wordLength = words[typeState.wordIndex].length;
        const newCharClassMap = structuredClone(charClassMap);
        for (let i = 0; i < wordLength; i++) {
          newCharClassMap[`${typeState.wordIndex},${i}`] = 'wrong';
        }
        return newCharClassMap;
      });
    }
  };

  const upCorrectChar = () => {
    setStatisticsData((statisticsData) => ({ ...statisticsData, correctChars: statisticsData.correctChars + 1 }));
  };

  return (
    <div className="container">
      <h1 className="title">Type Racer</h1>
      <Timer seconds={INITIAL_SECONDS} shouldTimerStart={isGameActive()} timeout={endGame} />
      {gameStatus === 'active' && (
        <>
          <WordList charClassMap={charClassMap} words={words} />
          <input
            disabled={!isGameActive()}
            onKeyDown={handleType}
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type here..."
            className="type-btn"
            type="text"
          />
        </>
      )}
      <input
        disabled={isGameActive()}
        placeholder="Start Game"
        onClick={startGame}
        className="start-btn"
        type="button"
        value="Start` Game"
      />
      {gameStatus === 'not active' && <Statistics statisticsData={statisticsData} />}
    </div>
  );
};

export default GameHandler;
