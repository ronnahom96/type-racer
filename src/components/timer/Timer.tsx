import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface TimerProps {
  isShouldTimerStart: boolean;
  seconds: number;
  timeoutHandler: () => void;
}

const Timer: React.FC<TimerProps> = ({ isShouldTimerStart, seconds, timeoutHandler }) => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (isShouldTimerStart) {
      const interval = setInterval(() => {
        setTimer((prevTimeVal) => {
          if (prevTimeVal > 0) {
            return prevTimeVal - 1;
          } else {
            clearInterval(interval);
            return seconds;
          }
        });
      }, 1000);
    }
  }, [isShouldTimerStart, seconds]);

  useEffect(() => {
    if (timer === 0) {
      timeoutHandler();
    }
  }, [timer, timeoutHandler]);

  return isShouldTimerStart ? (
    <Typography variant="h4" margin={1}>
      Timer: {timer}
    </Typography>
  ) : null;
};

export default Timer;
