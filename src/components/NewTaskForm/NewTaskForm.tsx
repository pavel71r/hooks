import React, { useState } from "react";
import "./NewTaskForm.css";

type AddTaskType = {
  addTask: (label: string, sec: number) => void;
};

const NewTaskForm = (props: AddTaskType) => {
  const [label, setLabel] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");

  const onSubmit = (event: { preventDefault: () => void }) => {
    let text = label.replace(/\s/g, "");
    if (text.length) {
      let sec = Number(minutes) * 60 + Number(seconds);
      props.addTask(label, sec);
      setLabel("");
      setMinutes("");
      setSeconds("");
    }
    event.preventDefault();
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="NewTaskForm"
        placeholder="What needs to be done?"
        onChange={(e) => {
          setLabel(e.target.value);
        }}
        value={label}
      />
      <input
        type="number"
        className="FormTime"
        placeholder="Min"
        value={minutes}
        onChange={(e) => {
          setMinutes(e.target.value);
        }}
        max={59}
        min={0}
      ></input>
      <input
        type="number"
        className="FormTime"
        placeholder="Sec"
        value={seconds}
        onChange={(e) => {
          setSeconds(e.target.value);
        }}
        max={59}
        min={0}
      ></input>
      <input type="submit" className="FormSubmit"></input>
    </form>
  );
};

export default NewTaskForm;
