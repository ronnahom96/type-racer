/* eslint-disable no-unused-vars */
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { StatisticsData } from '../../common/interfaces';
import './Statistics.css';

interface StatisticsProps {
  statisticsData: StatisticsData;
}

const Statistics: React.FC<StatisticsProps> = ({ statisticsData }) => {
  const { correctChars, correctWords, incorrectWords } = statisticsData;
  return (
    <Card sx={{ minWidth: 400 }}>
      <CardContent>
        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
          Game Stats
        </Typography>
        <Typography variant="h5" component="div">
          WPM (word per minutes): {correctWords}
        </Typography>
        {correctWords > 0 && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Accuracy: {Math.round((correctWords / (incorrectWords + correctWords)) * 100)}%
          </Typography>
        )}
        <Typography variant="body2">Mistakes: incorrectWords: {incorrectWords}</Typography>
      </CardContent>
    </Card>

    //   <h3 className="wpm">WPM: {correctWords}</h3>
    //   <h3>CPM: {correctChars}</h3>
    //   {correctWords > 0 && <h3>Accuracy: {Math.round((correctWords / (incorrectWords + correctWords)) * 100)}%</h3>}
    //   <h4>Mistakes: incorrectWords: {incorrectWords}</h4>
    // </div>
  );
};

export default Statistics;
