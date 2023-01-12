import { useEffect, useState } from "react";

export const useTimer = (
  initialValue: number
): [number, boolean, () => void] => {
  const [timer, setTimer] = useState(initialValue);
  const [isTimerActive, setIsTimerActive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimeVal) =>
        prevTimeVal > 0 ? prevTimeVal - 1 : prevTimeVal
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerActive(false);
    }
  }, [timer]);

  const startOverTimer = () => {
    setTimer(initialValue);
    setIsTimerActive(true);
  }

  return [timer, isTimerActive, startOverTimer];
};
