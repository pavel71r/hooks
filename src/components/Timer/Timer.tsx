import React, { useState, useEffect } from 'react';

import './Timer.css';
import type { TaskType } from '../Task/Task';

const Timer = (props: TaskType) => {
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(props.seconds);

  const onStart = () => setTimer(true);
  const onStop = () => setTimer(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (props.isCompleted) {
        onStop();
      }
      if (!props.seconds) {
        onStop();
      }
      if (timer) {
        setSeconds(() => seconds - 1);
      }
    }, 1000);

    props.updateTimer(seconds);

    return () => clearInterval(interval);
  }, [timer, seconds, props.isCompleted]);

  return (
    <div className="Timer">
      <button className="Start" onClick={onStart}>
        ▶
      </button>
      <button className="Stop" onClick={onStop}>
        ⏸
      </button>
      {`${Math.trunc(seconds / 60)}:${seconds % 60}`}
    </div>
  );
};

export default Timer;
