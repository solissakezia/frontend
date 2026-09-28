import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDeleteTask, onEditClick }) {
  if (tasks.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 0', color: '#64748b' }}>
        <p style={{ fontSize: '15px', margin: 0 }}>Tidak ada tugas yang ditemukan.</p>
      </div>
    );
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDeleteTask={onDeleteTask}
          onEditClick={onEditClick}
        />
      ))}
    </ul>
  );
}

export default TaskList;