import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoItem from './components/TodoItem';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null); // 🆕 editing ID track karne ke liye

  // 📥 Fetch todos from backend
  const fetchTodos = async () => {
    const res = await axios.get('https://todo-x84e.onrender.com/api/todos');
    setTodos(res.data);
    console.log("Todos from API:", res.data);
  };

  // ➕ Add or ✏️ Update todo
  const addTodo = async () => {
    if (!text.trim()) return;

    if (editingId) {
      // ✏️ Update mode
      await axios.put(`https://todo-x84e.onrender.com/api/todos/${editingId}`, { text });
      setEditingId(null);
    } else {
      // ➕ Add mode
      await axios.post('https://todo-x84e.onrender.com/api/todos', { text });
    }

    setText('');        // ✅ Input clear after add/update
    fetchTodos();       // 🔄 Refresh list
  };

  // ✔️ Toggle complete/incomplete
  const toggleTodo = async (id, completed) => {
    await axios.put(`https://todo-x84e.onrender.com/api/todos/${id}`, { completed: !completed });
    fetchTodos();
  };

  // 🗑 Delete task
  const deleteTodo = async (id) => {
    await axios.delete(`https://todo-x84e.onrender.com/api/todos/${id}`);
    fetchTodos();
  };

  // ✏️ Start editing
  const startEdit = (id, currentText) => {
    setEditingId(id);
    setText(currentText);
  };

  // 🔁 On mount: fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>My Todo List</h1>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter a task"
      />
      <button onClick={addTodo}>
        {editingId ? 'Update' : 'Add'}
      </button>

      <ul>
        {todos.map(todo => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={startEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
