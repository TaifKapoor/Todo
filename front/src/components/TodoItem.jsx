import React from 'react';
// 


const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  return (
    <li>
      <span
        className={todo.completed ? 'completed' : ''}
        onClick={() => onToggle(todo._id, todo.completed)}
      >
        {todo.text}
      </span>
      <div className="btn-group">
        <button onClick={() => onEdit(todo._id, todo.text)}>Edit</button>
        <button onClick={() => onDelete(todo._id)}>Delete</button>
      </div>
    </li>
  );
};

export default TodoItem;
