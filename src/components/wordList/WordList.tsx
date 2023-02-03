import React, { useCallback, useContext, useEffect, useState } from 'react';
import WORDS_ASSET from '../../assets/words.json';
import { TypingResultContext } from '../../common/typingResultContext';
import Word from '../word/Word';
import './WordList.css';

interface WordListProps {
  isGameActive: boolean;
  input: string;
}

const words = WORDS_ASSET.sort(() => Math.random() - 0.5);

const WordList: React.FC<WordListProps> = ({ input }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const { typingResult, updateTypingResult } = useContext(TypingResultContext);

  const handleSpaceBar = useCallback(() => {
    const trimmedInput = input.trim();
    const currentWord = words[wordIndex];
    const isMatch = currentWord === trimmedInput;
    setWordIndex((wordIndex) => wordIndex + 1);

    if (isMatch) {
      const correctChars = calculateCorrectChars(trimmedInput, currentWord);
      updateTypingResult({
        ...typingResult,
        correctCharsNumber: correctChars,
        correctWords: new Set([...Array.from(typingResult.correctWords), currentWord])
      });
    } else {
      updateTypingResult({
        ...typingResult,
        inCorrectWords: new Set([...Array.from(typingResult.inCorrectWords), currentWord])
      });
    }
  }, [words, wordIndex, input, typingResult, updateTypingResult]);

  const calculateCorrectChars = (input: string, word: string) => {
    let correctChars = 0;

    for (let currCharIndex = 0; currCharIndex < word.length; currCharIndex++) {
      if (input[currCharIndex] === word[currCharIndex]) {
        correctChars++;
      }
    }
    return correctChars;
  };

  useEffect(() => {
    if (input.at(-1) === ' ') {
      handleSpaceBar();
    }
  }, [input, handleSpaceBar]);

  return (
    <div className="word-list-container">
      {words.map((word, currWordIndex) => (
        <Word
          key={currWordIndex}
          input={input}
          word={word}
          wordIndex={currWordIndex}
          isCurrentWord={currWordIndex === wordIndex}
          isPastWord={currWordIndex < wordIndex}
        />
      ))}
    </div>
  );
};

export default WordList;
