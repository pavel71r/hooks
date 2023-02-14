import React, { useState, useEffect } from "react";
import "./Timer.css";
import type { TaskType } from "../Task/Task";

type TimerType = {
  clickText: boolean;
  offClickText: () => void;
  props: TaskType;
};

const Timer = (props: TimerType) => {
  const [timer, setTimer] = useState(false);
  const [seconds, setSeconds] = useState(props.props.seconds);

  const onStart = () => {
    setTimer(() => true);
  };
  const onStop = () => {
    props.offClickText();
    setTimer(() => false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer) {
        setSeconds(() => seconds - 1);
      }
      if (props.props.isCompleted) {
        onStop();
      }
      if (props.clickText) {
        onStart();
      }
      if (!props.props.seconds) {
        onStop();
      }
    }, 1000);

    props.props.updateTimer(seconds);

    return () => {
      return clearInterval(interval);
    };
  }, [timer, seconds, props.clickText]);

  return (
    <React.Fragment>
      <span className="Timer">
        <span className="Start" onClick={onStart}>
          ▶
        </span>
        <span className="Stop" onClick={onStop}>
          ⏸
        </span>
        {`${Math.trunc(seconds / 60)}:${seconds % 60}`}
      </span>
    </React.Fragment>
  );
};

export default Timer;
