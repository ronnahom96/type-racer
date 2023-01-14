/* eslint-disable no-unused-vars */
import React from 'react';
import { StatisticsData } from '../../common/interfaces';
import './Statistics.css';

interface StatisticsProps {
  statisticsData: StatisticsData;
}

const Statistics: React.FC<StatisticsProps> = ({ statisticsData }) => {
  const { correctChars, correctWords, incorrectWords } = statisticsData;
  return (
    <div className="statistics-container">
      <h2>statistics</h2>
      <h3 className="wpm">WPM: {correctWords}</h3>
      <h3>CPM: {correctChars}</h3>
      {correctWords > 0 && <h3>Accuracy: {Math.round((correctWords / (incorrectWords + correctWords)) * 100)}%</h3>}
      <h4>Mistakes: incorrectWords: {incorrectWords}</h4>
    </div>
  );
};

export default Statistics;
