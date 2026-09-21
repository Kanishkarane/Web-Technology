import React, { useState } from 'react';

function TaskItem({ todo, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.task);

  const save = () => {
    if (text.trim() === '') return;
    onEdit(todo._id, text.trim());
    setEditing(false);
  };

  const cancel = () => {
    setText(todo.task);
    setEditing(false);
  };

  return (
    <li className="task-item">
      {editing ? (
        <>
          <input
            className="edit-input"
            value={text}
            autoFocus
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') cancel();
            }}
          />
          <div className="actions">
            <button onClick={save}>Save</button>
            <button className="ghost" onClick={cancel}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <label className="task-label">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo)}
            />
            <span className={todo.completed ? 'done' : ''}>{todo.task}</span>
          </label>
          <div className="actions">
            <button className="ghost" onClick={() => setEditing(true)}>Edit</button>
            <button className="danger" onClick={() => onDelete(todo._id)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
}

export default TaskItem;
