import React from 'react';
import { TypingResult } from './interfaces';

interface TypingResultContextProps {
  typingResult: TypingResult;
  updateTypingResult: (typingResult: TypingResult) => void;
}

export const TypingResultContext = React.createContext<TypingResultContextProps>({
  typingResult: {
    correctWords: new Set(),
    inCorrectWords: new Set(),
    correctCharsNumber: 0
  },
  updateTypingResult: () => {}
});
