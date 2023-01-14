import React, { useEffect, useState, KeyboardEvent } from 'react';
import wordsAsset from '../../assets/words.json';
import './WordList.css';

interface WordListProps {
  isGameActive: boolean;
  keyEvent: KeyboardEvent<HTMLInputElement> | null;
  upCorrectWords: () => void;
  upIncorrectWords: () => void;
  upCorrectChars: () => void;
  handleSpaceBarEvent: () => void;
}

const WordList: React.FC<WordListProps> = ({
  isGameActive,
  keyEvent,
  upCorrectWords,
  upIncorrectWords,
  upCorrectChars,
  handleSpaceBarEvent
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [charClassMap, setCharClassMap] = useState<Record<string, string>>({});
  const [lastWord, setLastWord] = useState('');
  const [words, setWords] = useState(wordsAsset);

  useEffect(() => {
    if (isGameActive) {
      generateWords();
      setWordIndex(0);
      setCharIndex(0);
      setLastWord('');
      setCharClassMap({});
    }
  }, [isGameActive]);

  const generateWords = () => {
    setWords(wordsAsset.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    if (keyEvent === null) return;

    switch (keyEvent.key) {
      case ' ': {
        handleSpaceBar();
        break;
      }
      case 'Backspace': {
        handleBackspace();
        break;
      }
      default: {
        handleDefaultType();
        break;
      }
    }
  }, [keyEvent]);

  const handleDefaultType = () => {
    let className = '';
    if (isGameActive && words[wordIndex] && words[wordIndex][charIndex] === keyEvent?.key) {
      className = 'success';
      upCorrectChars();
    } else {
      className = 'wrong';
    }

    setLastWord((setLastWord) => setLastWord + keyEvent?.key);
    paintChar(wordIndex, charIndex, className);
    setCharIndex((charIndex) => charIndex + 1);
  };

  const paintChar = (wordIndex: number, charIndex: number, className: string) => {
    setCharClassMap((charClassMap) => ({ ...charClassMap, [`${wordIndex},${charIndex}`]: className }));
  };

  const handleBackspace = () => {
    setLastWord((lastWord) => lastWord.substring(0, lastWord.length - 1));
    setCharIndex((charIndex) => charIndex - 1);
    paintChar(wordIndex, charIndex - 1, '');
  };

  const handleSpaceBar = () => {
    if (words[wordIndex] === lastWord.trim()) {
      upCorrectWords();
    } else {
      upIncorrectWords();
      const wordLength = words[wordIndex].length;
      for (let i = 0; i < wordLength; i++) {
        paintChar(wordIndex, i, 'wrong');
      }
    }

    setLastWord('');
    setCharIndex(0);
    setWordIndex((wordIndex) => wordIndex + 1);
    handleSpaceBarEvent();
  };

  const getClassByMap = (wordIndex: number, charIndex: number) => charClassMap[`${wordIndex},${charIndex}`];

  return (
    <div className="word-list-container">
      {words.map((word, wordIndex) => (
        <div key={wordIndex} className="word">
          {word.split('').map((char, charIndex) => (
            <span key={charIndex} className={getClassByMap(wordIndex, charIndex)}>
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
