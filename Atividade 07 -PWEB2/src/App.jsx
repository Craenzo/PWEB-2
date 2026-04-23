import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('Todas');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const tasksToShow = tasks.filter(t => {
    if (filter === 'Pendentes') return !t.completed;
    if (filter === 'Concluídas') return t.completed;
    return true;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Minhas Tarefas</h1>

      <form onSubmit={handleAddTask} style={styles.form}>
        <input 
          style={styles.input}
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Nova tarefa..."
        />
        <button type="submit" style={styles.addButton}>Adicionar</button>
      </form>

      <div style={styles.filterContainer}>
        {['Todas', 'Pendentes', 'Concluídas'].map(f => (
          <button 
            key={f} 
            onClick={() => setFilter(f)}
            style={{...styles.filterButton, backgroundColor: filter === f ? '#4CAF50' : '#444'}}
          >
            {f}
          </button>
        ))}
      </div>

      <ul style={styles.list}>
        {tasksToShow.map(task => (
          <li key={task.id} style={styles.listItem}>
            <div style={styles.taskInfo}>
              {/* CHECKBOX PARA CONCLUIR */}
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTask(task.id)} 
                style={styles.checkbox}
              />
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#888' : '#fff'
              }}>
                {task.text}
              </span>
            </div>
            <button onClick={() => removeTask(task.id)} style={styles.deleteButton}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { padding: '40px', fontFamily: 'Arial, sans-serif', maxWidth: '500px', margin: 'auto', color: '#fff' },
  title: { textAlign: 'center', marginBottom: '30px' },
  form: { display: 'flex', gap: '10px', marginBottom: '20px' },
  input: { flex: 1, padding: '10px', borderRadius: '4px', border: '1px solid #555', backgroundColor: '#222', color: '#fff' },
  addButton: { padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
  filterContainer: { display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' },
  filterButton: { padding: '8px 15px', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9rem' },
  list: { listStyle: 'none', padding: 0 },
  listItem: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: '#333', 
    padding: '12px', 
    marginBottom: '8px', 
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  taskInfo: { display: 'flex', alignItems: 'center', gap: '12px' },
  checkbox: { width: '18px', height: '18px', cursor: 'pointer' },
  deleteButton: { backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }
};

export default App;