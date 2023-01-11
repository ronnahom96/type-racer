import { useEffect, useState } from "react";

export const useTimer = (initialValue: number): number => {
  const [timer, setTimer] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimeVal) => prevTimeVal - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return timer;
};
