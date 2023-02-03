import { Box, Button, Typography } from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { GameStatus } from '../../common/enums';
import { TypingResult } from '../../common/interfaces';
import { TypingResultContext } from '../../common/typingResultContext';
import Statistics from '../statistics/Statistics';
import Timer from '../timer/Timer';
import UserInput from '../userInput/userInput';
import WordList from '../wordList/WordList';
import WORDS_ASSET from '../../assets/words.json';

const INITIAL_SECONDS = 60;

const GameHandler: React.FC = () => {
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Waiting);
  const [userInput, setUserInput] = useState('');
  const [words, setWords] = useState(WORDS_ASSET.sort(() => Math.random() - 0.5));

  const [typingResult, setTypingResult] = useState<TypingResult>({
    correctWords: new Set(),
    inCorrectWords: new Set(),
    correctCharsNumber: 0
  });

  const updateTypingResult = (typingResult: TypingResult) => {
    setTypingResult(typingResult);
  };

  const isGameActive = gameStatus === GameStatus.Active;

  useEffect(() => {
    if (userInput.at(-1) === ' ') {
      setUserInput('');
    }
  }, [userInput]);

  const startGame = () => {
    if (!isGameActive) {
      setGameStatus(GameStatus.Active);
      setTypingResult({
        correctWords: new Set(),
        inCorrectWords: new Set(),
        correctCharsNumber: 0
      });
      setWords(WORDS_ASSET.sort(() => Math.random() - 0.5));
    }
  };

  const endGame = useCallback(() => {
    setGameStatus(GameStatus.NotActive);
    setUserInput('');
  }, []);

  const handleSetCurrInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  }, []);

  return (
    <Box sx={{ margin: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography style={{ color: '#1565c0' }} variant="h3" className="title" margin={1}>
        Type Racer
      </Typography>
      <Timer seconds={INITIAL_SECONDS} isShouldTimerStart={isGameActive} timeoutHandler={endGame} />
      <TypingResultContext.Provider value={{ typingResult, updateTypingResult }}>
        {isGameActive ? (
          <>
            <WordList words={words} input={userInput} />
            <UserInput isGameActive={isGameActive} setInput={handleSetCurrInput} input={userInput} />
          </>
        ) : (
          <Box sx={{ margin: 3 }}>
            <Button variant="contained" placeholder="Start Game" onClick={startGame} type="button">
              Start Game
            </Button>
          </Box>
        )}
        {!isGameActive && gameStatus !== GameStatus.Waiting && <Statistics />}
      </TypingResultContext.Provider>
    </Box>
  );
};

export default GameHandler;
