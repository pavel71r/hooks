import React, { useState } from 'react';
import './Task.css';
import { formatDistance } from 'date-fns';

import Timer from '../Timer/Timer';

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

  const time = formatDistance(new Date(), new Date(props.createDate));
  let classNames = '';
  if (props.isCompleted) {
    classNames += 'done';
  }
  let el;
  const checkbox = (
    <input className="Toggle" type="checkbox" onChange={props.onToggleDone} checked={props.isCompleted} />
  );

  const createdTime = <span className="time">{`created ${time}  ago`}</span>;

  if (!isEdit) {
    el = (
      <label className="Description">
        <span className={classNames}>{value}</span>
        <Timer {...props} />
      </label>
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
  }
  return (
    <div className="Task">
      {!isEdit && checkbox}
      {el}
      {!isEdit && createdTime}
      <button className="Edit" onClick={buttonEdit} />
      <button className="Destroy" onClick={props.deleteTask} />
    </div>
  );
};

export default Task;
