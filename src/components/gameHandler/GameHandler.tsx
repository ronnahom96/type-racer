/* eslint-disable no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react';
import wordsAsset from '../../assets/words.json';
import { StatisticsData, TypeState } from '../../common/interfaces';
import { GameStatus } from '../../common/types';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';

const INITIAL_SECONDS = 60;

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
        handleSpaceBar();
        break;
      }
      case 'Backspace': {
        handleBackspace();
        break;
      }
      default: {
        handleDefaultType(key);
        break;
      }
    }
  };

  const handleDefaultType = (key: string) => {
    let className = '';
    setTypeState((typeState) => ({ ...typeState, charIndex: typeState.charIndex + 1, lastChar: key }));
    if (words[typeState.wordIndex][typeState.charIndex + 1] === key) {
      className = 'success';
      upCorrectChar();
    } else {
      className = 'wrong';
    }

    paintChar(typeState.wordIndex, typeState.charIndex + 1, className);
  };

  const paintChar = (wordIndex: number, charIndex: number, className: string) => {
    setCharClassMap((charClassMap) => ({ ...charClassMap, [`${wordIndex},${charIndex}`]: className }));
  };

  const handleBackspace = () => {
    setTypeState((typeState) => ({ ...typeState, charIndex: typeState.charIndex - 1, lastChar: '' }));
    paintChar(typeState.wordIndex, typeState.charIndex, '');
  };

  const handleSpaceBar = () => {
    if (words[typeState.wordIndex] === input.trim()) {
      setStatisticsData((statisticsData) => ({ ...statisticsData, correctWords: statisticsData.correctWords + 1 }));
    } else {
      setStatisticsData((statisticsData) => ({ ...statisticsData, incorrectWords: statisticsData.incorrectWords + 1 }));
      const wordLength = words[typeState.wordIndex].length;
      for (let i = 0; i < wordLength; i++) {
        paintChar(typeState.wordIndex, i, 'wrong');
      }
    }

    setTypeState((typeState) => ({ ...typeState, wordIndex: typeState.wordIndex + 1, charIndex: -1, lastChar: '' }));
    setInput('');
  };

  const upCorrectChar = () => {
    setStatisticsData((statisticsData) => ({ ...statisticsData, correctChars: statisticsData.correctChars + 1 }));
  };

  return (
    <Box sx={{ margin: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography style={{ color: '#1565c0' }} variant="h3" className="title" margin={1}>
        Type Racer
      </Typography>
      <Timer seconds={INITIAL_SECONDS} shouldTimerStart={isGameActive()} timeout={endGame} />
      {gameStatus === 'active' && (
        <>
          <WordList charClassMap={charClassMap} words={words} />
          <TextField
            variant="outlined"
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
      {!isGameActive() && (
        <Box sx={{ margin: 3 }}>
          <Button variant="contained" placeholder="Start Game" onClick={startGame} type="button">
            Start Game
          </Button>
        </Box>
      )}
      {gameStatus === 'not active' && <Statistics statisticsData={statisticsData} />}
    </Box>
  );
};

export default GameHandler;
