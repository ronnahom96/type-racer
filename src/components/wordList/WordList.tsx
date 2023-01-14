/* eslint-disable no-unused-vars */
import React from 'react';
import './WordList.css';

interface WordListProps {
  words: string[];
  charClassMap: Record<string, string>;
}

const WordList: React.FC<WordListProps> = ({ words, charClassMap }) => {
  return (
    <div className="word-list-container">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className={charClassMap[`${wordIndex},${charIndex}`]}>
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
