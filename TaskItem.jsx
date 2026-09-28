import React from 'react';

function TaskItem({ task, onToggleComplete, onDeleteTask, onEditClick }) {
  const handleDeleteWithConfirm = () => {
    const isConfirmed = window.confirm(`Apakah Anda yakin ingin menghapus tugas "${task.title}"?`);
    if (isConfirmed) {
      onDeleteTask(task.id);
    }
  };

  const priorityBadge = {
    Tinggi: { bg: '#fef2f2', color: '#dc2626' },
    Sedang: { bg: '#fefce8', color: '#ca8a04' },
    Rendah: { bg: '#f0fdf4', color: '#16a34a' },
  }[task.priority || 'Sedang'];

  return (
    <li
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 20px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        backgroundColor: task.completed ? '#f8fafc' : '#ffffff',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '16px',
              fontWeight: '600',
              color: task.completed ? '#94a3b8' : '#1e293b',
              textDecoration: task.completed ? 'line-through' : 'none',
            }}
          >
            {task.title}
          </span>
          
          <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', backgroundColor: '#eff6ff', color: '#1d4ed8', fontWeight: '600' }}>
            {task.category}
          </span>

          <span style={{ fontSize: '12px', padding: '3px 10px', borderRadius: '20px', backgroundColor: priorityBadge.bg, color: priorityBadge.color, fontWeight: '600' }}>
            {task.priority || 'Sedang'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#64748b' }}>
          {task.createdAt && <span>Dibuat: {task.createdAt}</span>}
          {task.dueDate && <span style={{ color: '#d97706', fontWeight: '600' }}>📅 Deadline: {task.dueDate}</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onToggleComplete(task.id)}
          style={{
            padding: '8px 14px',
            backgroundColor: task.completed ? '#64748b' : '#2563eb',
            color: '#ffffff',
            fontWeight: '600',
            fontSize: '13px',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          {task.completed ? 'Batal' : 'Selesai'}
        </button>

        <button
          onClick={() => onEditClick(task)}
          style={{
            padding: '8px 14px',
            backgroundColor: '#f1f5f9',
            color: '#0f172a',
            fontWeight: '600',
            fontSize: '13px',
            border: '1px solid #cbd5e1',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Edit
        </button>

        <button
          onClick={handleDeleteWithConfirm}
          style={{
            padding: '8px 14px',
            backgroundColor: '#ffffff',
            color: '#2563eb',
            fontWeight: '600',
            fontSize: '13px',
            border: '1px solid #2563eb',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Hapus
        </button>
      </div>
    </li>
  );
}

export default TaskItem;