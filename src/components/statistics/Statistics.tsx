import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { TypingResultContext } from '../../common/typingResultContext';

const Statistics: React.FC = () => {
  const { typingResult } = useContext(TypingResultContext);
  const { correctWords, correctCharsNumber, inCorrectWords } = typingResult;
  const correctWordsSize = correctWords.size;
  const inCorrectWordsSize = inCorrectWords.size;

  return (
    <Card sx={{ minWidth: 400, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
      <CardContent>
        <Typography sx={{ fontSize: 26 }} color="text.secondary" gutterBottom>
          Game Stats
        </Typography>
        <Typography variant="h5" component="div">
          WPM (word per minutes): {correctWordsSize}
        </Typography>
        <Typography variant="h5" component="div">
          CPM (char per minutes): {correctCharsNumber}
        </Typography>
        {correctWordsSize > 0 && (
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Accuracy: {Math.round((correctWordsSize / (inCorrectWordsSize + correctWordsSize)) * 100)}%
          </Typography>
        )}
        <Typography variant="body2">Mistakes: incorrectWords: {inCorrectWordsSize}</Typography>
      </CardContent>
    </Card>
  );
};

export default Statistics;
