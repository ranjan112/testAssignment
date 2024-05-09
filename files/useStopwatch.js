import { useState, useEffect, useRef } from "react";

const useStopwatch = () => {
    const [runningTime, setRunningTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);
  const pauseTimeRef = useRef(0);

  const startStopwatch = () => {
    if (runningTime === 0) {
      setStartTime(performance.now());
    } else {
      const pauseDuration = performance.now() - pauseTimeRef.current;
      setStartTime((prevStartTime) => prevStartTime + pauseDuration);
    }
    setIsRunning(true);
  };

  const pauseStopwatch = () => {
    setIsRunning(false);
    pauseTimeRef.current = performance.now();
  };

  const resetStopwatch = () => {
    setRunningTime(0);
    setIsRunning(false);
    setLaps([]);
  };

  const lapStopwatch = () => {
    setLaps((prevLaps) => {
      return [runningTime, ...prevLaps];
    });
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRunningTime(performance.now() - startTime);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, startTime]);


  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor(time % 1000 / 10);
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
    const formattedMilliseconds = milliseconds.toString().padStart(2, "0");

    if (hours > 0) {
      return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    }

    return `${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
  };

  return {
    timeRemaining: formatTime(runningTime),
    isRunning,
    laps,
    startStopwatch,
    pauseStopwatch,
    resetStopwatch,
    lapStopwatch,
    formatTime,
  };
};

export default useStopwatch;