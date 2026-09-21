import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ todos, onToggle, onEdit, onDelete }) {
  return (
    <ul className="task-list">
      {todos.map((todo) => (
        <TaskItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
