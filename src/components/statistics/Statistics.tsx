import React from 'react';
import './Statistics.css';

interface StatisticsProps {
  correctWords: number;
  correctChars: number;
  incorrectWords: number;
}

const Statistics: React.FC<StatisticsProps> = ({ correctWords, correctChars, incorrectWords }) => {
  return (
    <div className="statistics-container">
      <h2>statistics</h2>
      <h3 className="wpm">WPM: {correctWords}</h3>
      <h3>CPM: {correctChars}</h3>
      {correctWords > 0 && <h3>Accuracy: {Math.round((correctWords / (incorrectWords + correctWords)) * 100)}%</h3>}
    </div>
  );
};

export default Statistics;
