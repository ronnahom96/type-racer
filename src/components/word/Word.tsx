import React, { useContext, useMemo } from 'react';
import { TypingResultContext } from '../../common/typingResultContext';
import './Word.css';

interface WordProps {
  word: string;
  wordIndex: number;
  input: string;
  isCurrentWord: boolean;
  isPastWord: boolean;
}

const Word: React.FC<WordProps> = ({ word, wordIndex, input, isCurrentWord, isPastWord }) => {
  const { typingResult } = useContext(TypingResultContext);
  const { correctWords } = typingResult;
  
  const notHighlightClassName = useMemo(() => {
    let className = '';
    if (isPastWord) {
        className = correctWords.has(word) ? 'success' : 'wrong'
    }

    return className;
  }, [word, isPastWord, correctWords]);

  return isCurrentWord ? (
    <div key={wordIndex} className="word current-word">
      {word.split('').map((char, charIndex) => {
        let charClassName = '';
        if (charIndex < input.length) {
          charClassName = char === input[charIndex] ? 'success' : 'wrong';
        }
        return (
          <span key={charIndex} className={charClassName}>
            {char}
          </span>
        );
      })}
      &nbsp;
    </div>
  ) : (
    <div key={wordIndex} className={`word ${notHighlightClassName}`}>
      {word.split('').map((char, charIndex) => (
        <span key={charIndex}>{char}</span>
      ))}
      &nbsp;
    </div>
  );
};

export default Word;
