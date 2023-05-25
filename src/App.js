import React, { useState, useEffect } from 'react';
import './App.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Task } from './Task';

function App() {
  const [todolist, setTodoList] = useState(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const addTask = () => {
    if (newTask.trim() === '') {
      return;
    }
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskName: newTask,
      completed: false,
    };
    setTodoList([...todolist, task]);
    setNewTask('');
  };

  const deleteTask = (id) => {
    setTodoList(todolist.filter((task) => task.id !== id));
  };

  const completeTask = (id) => {
    setTodoList((prevList) => {
      const updatedList = prevList.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed }; // Toggle the completed property
        }
        return task;
      });
      return updatedList;
    });
  };
  
  

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(todolist));
  }, [todolist]);

  const unfinishedTasksCount = todolist.filter((task) => !task.completed).length;
  const finishedTasksCount = todolist.filter((task) => task.completed).length;

  const completedTasks = todolist.filter((task) => task.completed);
  const uncompletedTasks = todolist.filter((task) => !task.completed);

  return (
    <div className="App">
      <nav className="navbar">
        <h1 className="navbar-heading">ToDo-List</h1>
      </nav>
      <div className="content">
        <div className="container">
          <h1 className="heading">
            My Todos
            <div className="count-front">
              <span>{todolist.length}</span>
            </div>
          </h1>

          <div className="add-tasks">
            <input
              type="text"
              value={newTask}
              onChange={handleChange}
              placeholder="Enter a task"
            />
            <button onClick={addTask}>Add Task</button>
          </div>
          <div className="count">
            Unfinished Tasks: {unfinishedTasksCount} | Finished Tasks:{' '}
            {finishedTasksCount}
          </div>
          <div className="list">
            <TransitionGroup component={null}>
              {uncompletedTasks.map((task) => (
                <CSSTransition
                  key={task.id}
                  timeout={300}
                  classNames="task-item"
                >
                  <Task
                    taskName={task.taskName}
                    id={task.id}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                    completed={task.completed}
                  />
                </CSSTransition>
              ))}
              {completedTasks.map((task) => (
                <CSSTransition
                  key={task.id}
                  timeout={300}
                  classNames="task-item"
                >
                  <Task
                    taskName={task.taskName}
                    id={task.id}
                    deleteTask={deleteTask}
                    completeTask={completeTask}
                    completed={task.completed}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} ToDo-List. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
