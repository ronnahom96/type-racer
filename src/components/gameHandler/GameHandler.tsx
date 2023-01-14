import { Box, Button, TextField, Typography } from '@mui/material';
import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { GameStatus } from '../../common/types';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import WordList from '../wordList/WordList';

const INITIAL_SECONDS = 60;

const GameHandler: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>('waiting');
  const [currInput, setCurrInput] = useState('');
  const [correctChars, setCorrectChars] = useState(0);
  const [correctWords, setCorrectWords] = useState(0);
  const [incorrectWords, setIncorrectWords] = useState(0);
  const [keyEvent, setKeyEvent] = useState<KeyboardEvent<HTMLInputElement> | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isGameActive()) {
      inputRef.current?.focus();
    }
  }, [gameStatus]);

  const isGameActive = () => gameStatus === 'active';
  const startGame = () => {
    if (!isGameActive()) {
      setGameStatus('active');
      setKeyEvent(null);
      resetGameStats();
    }
  };

  const resetGameStats = () => {
    setCorrectChars(0);
    setCorrectWords(0);
    setIncorrectWords(0);
  };

  const endGame = () => {
    setGameStatus('not active');
    setCurrInput('');
  };

  const handleType = (event: KeyboardEvent<HTMLInputElement>) => {
    setKeyEvent(event);
    if (event.key === ' ') {
      setCurrInput('');
    }
  };

  return (
    <Box sx={{ margin: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography style={{ color: '#1565c0' }} variant="h3" className="title" margin={1}>
        Type Racer
      </Typography>
      <Timer seconds={INITIAL_SECONDS} shouldTimerStart={isGameActive()} timeoutHandler={endGame} />
      {gameStatus === 'active' && (
        <WordList
          keyEvent={keyEvent}
          isGameActive={isGameActive()}
          upCorrectChars={() => setCorrectChars((correctChar) => correctChar + 1)}
          upCorrectWords={() => setCorrectWords((correctWords) => correctWords + 1)}
          upIncorrectWords={() => setIncorrectWords((incorrectWords) => incorrectWords + 1)}
          handleSpaceBarEvent={() => setCurrInput('')}
        />
      )}
      <TextField
        variant="outlined"
        disabled={!isGameActive()}
        onKeyDown={handleType}
        ref={inputRef}
        value={currInput}
        onChange={(e) => setCurrInput(e.target.value)}
        placeholder="Type here..."
        className="type-btn"
        type="text"
      />
      {!isGameActive() && (
        <Box sx={{ margin: 3 }}>
          <Button variant="contained" placeholder="Start Game" onClick={startGame} type="button">
            Start Game
          </Button>
        </Box>
      )}
      {gameStatus === 'not active' && (
        <Statistics correctChars={correctChars} correctWords={correctWords} incorrectWords={incorrectWords} />
      )}
    </Box>
  );
};

export default GameHandler;
