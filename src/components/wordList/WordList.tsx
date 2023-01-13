/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import wordsSource from '../../assets/words.json';
import './WordList.css';

interface WordListProps {
  currWordIndex: number;
  currCharIndex: number;
  lastChar: string;
}

const WordList: React.FC<WordListProps> = ({ currWordIndex, currCharIndex, lastChar }) => {
  const [words, setWords] = useState(wordsSource);

  const getCharClassName = (char: string, wordIndex: number, charIndex: number): string => {
    if (currCharIndex === charIndex && currWordIndex === wordIndex) {
      if (char === lastChar) {
        return 'success';
      } else {
        return 'wrong';
      }
    }

    return '';
  };

  return (
    <div className="word-list-container">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className={getCharClassName(char, wordIndex, charIndex)}>
              {char}
            </span>
          ))}
          &nbsp;
        </div>
      ))}
    </div>
  );
};

export default WordList;
