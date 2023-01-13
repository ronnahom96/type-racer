import React, { useEffect, useState } from 'react';

interface TimerProps {
  isGameActive: boolean;
  seconds: number;
  finishGame: () => void;
}

const Timer: React.FC<TimerProps> = ({ isGameActive, seconds, finishGame }) => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (isGameActive) {
      const interval = setInterval(() => {
        setTimer((prevTimeVal) => {
          if (prevTimeVal > 0) {
            return prevTimeVal - 1;
          } else {
            clearInterval(interval);
            finishGame();
            return seconds;
          }
        });
      }, 1000);
    }
  }, [isGameActive]);

  return (
    <h2 hidden={!isGameActive} className="timer">
      Timer: {timer}
    </h2>
  );
};

export default Timer;
