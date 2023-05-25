export const Task = (props) => {
    return (
      <div className={`task-container${props.completed ? ' completed' : ''}`}>
        <div className="task-info">
          <input
            type="checkbox"
            checked={props.completed}
            onChange={() => props.completeTask(props.id)}
          />
          <h1 className="task-name">{props.taskName}</h1>
        </div>
        <button className="delete-button" onClick={() => props.deleteTask(props.id)}>
          X
        </button>
      </div>
    );
  };
  