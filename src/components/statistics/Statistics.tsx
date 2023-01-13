import React from 'react';
import './Statistics.css';

interface StatisticsProps {
  correctWords: number;
  correctChars: number;
  incorrectWords: number;
  seconds: number;
}

const Statistics: React.FC<StatisticsProps> = ({ correctWords, correctChars, incorrectWords, seconds }) => {
  return (
    <div className="statistics-container">
      <h2>statistics</h2>
      <h3>WPM: {correctWords / seconds}</h3>
      <h3>CPM: {correctChars / seconds}</h3>
      <h3>Accuracy: {(incorrectWords / correctWords) * 100}</h3>
    </div>
  );
};

export default Statistics;
