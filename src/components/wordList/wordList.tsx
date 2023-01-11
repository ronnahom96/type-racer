import React, { useState } from "react";
import "./wordList.css";

interface WordListProps {
  wordList: string[];
}

const WordList: React.FC<WordListProps> = ({ wordList }) => {
  const [sentence, setSentence] = useState(wordList.join(" "));

  return (
    <div className='word-list-container'>
      {sentence}
      {/* {wordList.map((word, index) => (
        <h3 key={index}>{word}</h3>
      ))} */}
    </div>
  );
};

export default WordList;
