import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import NewTaskForm from '../NewTaskForm/NewTaskForm';
import './App.css';
import TaskList from '../TaskList/TaskList';
import Footer from '../Footer/Footer';

export type TodoDataType = {
  label: string;
  id: string;
  isCompleted: boolean;
  createDate: Date;
  seconds: number;
};

const App = () => {
  const [todoData, setTodoData] = useState<Array<TodoDataType>>([
    {
      label: 'task',
      id: uuidv4(),
      isCompleted: true,
      createDate: new Date(),
      seconds: 3600,
    },
    {
      label: 'task',
      id: uuidv4(),
      isCompleted: false,
      createDate: new Date(),
      seconds: 3600,
    },
    {
      label: 'task',
      id: uuidv4(),
      isCompleted: false,
      createDate: new Date(),
      seconds: 3600,
    },
  ]);
  const [filter, setFilter] = useState('all');

  const onEdit = (label: string, id: string) => {
    const newTodoData = todoData.filter((item) => {
      if (item.id === id) {
        item.label = label;
      }
      return item;
    });
    setTodoData(newTodoData);
  };

  const buttonsFilter = (value: string) => {
    setFilter(value);
  };

  const clearCompleted = () => {
    const newTodoData = todoData.filter((item) => !item.isCompleted);
    setTodoData(newTodoData);
  };

  const deleteTask = (id: string) => {
    const idx = todoData.findIndex((item) => item.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setTodoData(newArray);
  };

  const addTask = (text: string, sec?: number) => {
    const newTask = {
      label: text,
      id: uuidv4(),
      isCompleted: false,
      createDate: new Date(),
      seconds: sec || 3600,
    };
    setTodoData([...todoData, newTask]);
  };

  const onToggleDone = (id: string) => {
    const idx = todoData.findIndex((item) => item.id === id);
    const oldTask = todoData[idx];
    const newTask = {
      ...oldTask,
      isCompleted: !oldTask.isCompleted,
    };
    const newTodoData = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    setTodoData(newTodoData);
  };

  const updateTimer = (value: number, id: string) => {
    const idx = todoData.findIndex((item) => item.id === id);
    const oldTask = todoData[idx];
    const newTask = {
      ...oldTask,
      seconds: value,
    };
    const newTodoData = [...todoData.slice(0, idx), newTask, ...todoData.slice(idx + 1)];
    setTodoData(newTodoData);
  };

  const statusCount = todoData.filter((item) => !item.isCompleted).length;

  return (
    <div className="App">
      <h1 className="AppHeader">todos</h1>
      <NewTaskForm
        addTask={(text, sec) => {
          addTask(text, sec);
        }}
      />
      <TaskList
        todoData={todoData}
        filter={filter}
        onToggleDone={(id) => {
          onToggleDone(id);
        }}
        deleteTask={(id) => {
          deleteTask(id);
        }}
        onEdit={(label, id) => {
          onEdit(label, id);
        }}
        updateTimer={(value, id) => {
          updateTimer(value, id);
        }}
      />
      <Footer
        statusCount={statusCount}
        buttonsFilter={(value) => {
          buttonsFilter(value);
        }}
        clearCompleted={() => {
          clearCompleted();
        }}
      />
    </div>
  );
};
export default App;
