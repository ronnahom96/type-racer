import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  shouldTimerStart: boolean;
  seconds: number;
  timeoutHandler: () => void;
}

const Timer: React.FC<TimerProps> = ({ shouldTimerStart, seconds, timeoutHandler }) => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (shouldTimerStart === true) {
      const interval = setInterval(() => {
        setTimer((prevTimeVal) => {
          if (prevTimeVal <= 0) {
            clearInterval(interval);
            return seconds;
          } else {
            return prevTimeVal - 1;
          }
        });
      }, 1000);
    }
  }, [shouldTimerStart]);

  useEffect(() => {
    if (timer === 0) {
      timeoutHandler();
    }
  }, [timer]);

  return !shouldTimerStart ? (
    <></>
  ) : (
    <Typography variant="h4" margin={1}>
      Timer: {timer}
    </Typography>
  );
};

export default Timer;
