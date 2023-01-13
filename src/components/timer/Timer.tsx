import React, { useEffect, useState } from 'react';

interface TimerProps {
  isGameActive: boolean;
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ isGameActive, seconds }) => {
  const [timer, setTimer] = useState(seconds);

  useEffect(() => {
    if (!isGameActive) return;

    const interval = setInterval(() => {
      setTimer((prevTimeVal) => (prevTimeVal > 0 ? prevTimeVal - 1 : prevTimeVal));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isGameActive]);

  return <h2 className="timer">Timer: {timer}</h2>;
};

export default Timer;
