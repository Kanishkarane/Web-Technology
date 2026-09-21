import React from 'react';

function TaskForm({ value, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a new task"
        value={value}
        onChange={onChange}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

export default TaskForm;
