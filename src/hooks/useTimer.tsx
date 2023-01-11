import { useEffect, useState } from "react";

export const useTimer = (initialValue: number): number => {
  const [timer, setTimer] = useState(initialValue);

  useEffect(() => {
    const interval = setInterval(() => {
      // TODO: need to think how to send event when it finish
      setTimer((prevTimeVal) =>
        prevTimeVal > 0 ? prevTimeVal - 1 : prevTimeVal
      );
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return timer;
};
