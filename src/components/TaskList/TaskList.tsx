import React from 'react';

import Task from '../Task/Task';
import type { TodoDataType } from '../App/App';

type TaskList = {
  todoData: Array<TodoDataType>;
  filter: string;
  deleteTask: (id: string) => void;
  onEdit: (label: string, id: string) => void;
  onToggleDone: (id: string) => void;
  updateTimer: (value: number, id: string) => void;
};

const TaskList = (props: TaskList) => {
  let elements: Array<any> = props.todoData.filter((item) => {
    if (props.filter === 'all') {
      return item;
    }
    if (props.filter === 'completed') {
      return item.isCompleted;
    }
    if (props.filter === 'active') {
      return !item.isCompleted;
    }
  });
  elements = elements.map((item) => {
    return (
      <li key={item.id}>
        <Task
          {...item}
          deleteTask={() => {
            props.deleteTask(item.id);
          }}
          onToggleDone={() => {
            props.onToggleDone(item.id);
          }}
          onEdit={(label) => {
            props.onEdit(label, item.id);
          }}
          updateTimer={(value: number) => {
            props.updateTimer(value, item.id);
          }}
        />
      </li>
    );
  });
  return <ul className="TaskList">{elements}</ul>;
};

export default TaskList;
