/* eslint-disable no-unused-vars */
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import { StatisticsData } from '../../common/interfaces';

interface StatisticsProps {
  statisticsData: StatisticsData;
}

const Statistics: React.FC<StatisticsProps> = ({ statisticsData }) => {
  const { correctChars, correctWords, incorrectWords } = statisticsData;
  return (
    <Card sx={{ minWidth: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <CardContent>
        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
          Game Stats
        </Typography>
        <Typography variant="h5" component="div">
          WPM (word per minutes): {correctWords}
        </Typography>
        <Typography variant="h5" component="div">
          CPM (char per minutes): {correctChars}
        </Typography>
        {correctWords > 0 && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Accuracy: {Math.round((correctWords / (incorrectWords + correctWords)) * 100)}%
          </Typography>
        )}
        <Typography variant="body2">Mistakes: incorrectWords: {incorrectWords}</Typography>
      </CardContent>
    </Card>
  );
};

export default Statistics;
