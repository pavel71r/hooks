import React, { useState } from "react";
import "./Task.css";
import { formatDistance } from "date-fns";
import Timer from "../Timer/Timer";

export type TaskType = {
  createDate: Date;
  deleteTask: () => void;
  id: string;
  isCompleted: boolean;
  label: string;
  onEdit: (event: string) => void;
  onToggleDone: () => void;
  seconds: number;
  updateTimer: (seconds: number) => void;
};

const Task = (props: TaskType) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(props.label);
  const [clickText, setClickText] = useState(false);

  const onEdit = (event: string) => {
    props.onEdit(event);
    setValue(event);
  };

  const buttonEdit = () => {
    setIsEdit(true);
  };
  const enter = (event: React.BaseSyntheticEvent) => {
    if (event.target[0].value) {
      setIsEdit(false);
    }
    event.preventDefault();
  };

  const onOnClickText = () => {
    setClickText(() => true);
  };

  const onOffClickText = () => {
    setClickText(() => false);
  };

  let time = formatDistance(new Date(), new Date(props.createDate));
  let classNames = "";
  if (props.isCompleted) {
    classNames += "done";
  }
  let el;
  let checkbox;
  if (!isEdit) {
    el = (
      <label className="Description">
        <span className={classNames} onClick={onOnClickText}>
          {value}
        </span>
        <Timer
          props={props}
          clickText={clickText}
          offClickText={onOffClickText}
        />
        <span className="time">{`created ${time}  ago`}</span>
      </label>
    );
    checkbox = (
      <input
        className="Toggle"
        type="checkbox"
        onChange={props.onToggleDone}
        checked={props.isCompleted}
      />
    );
  } else {
    el = (
      <form onSubmit={(event) => enter(event)} className="formEdit">
        <input
          value={value}
          onChange={(event) => {
            onEdit(event.target.value);
          }}
          autoFocus
        />
      </form>
    );
    checkbox = "";
  }
  return (
    <div className="Task">
      {checkbox}
      {el}
      <button className="Edit" onClick={buttonEdit} />
      <button className="Destroy" onClick={props.deleteTask} />
    </div>
  );
};

export default Task;
