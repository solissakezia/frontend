import React, { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kuliah');
  const [priority, setPriority] = useState('Sedang');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;

    const newTask = {
      id: Date.now(),
      title: title,
      category: category,
      priority: priority,
      dueDate: dueDate,
      completed: false,
      createdAt: formattedDate,
    };

    onAddTask(newTask);
    setTitle('');
    setCategory('Kuliah');
    setPriority('Sedang');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <input
        type="text"
        placeholder="Masukkan judul tugas baru..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none' }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '14px', cursor: 'pointer' }}
        >
          <option value="Kuliah">Kuliah</option>
          <option value="Pribadi">Pribadi</option>
          <option value="Proyek">Proyek</option>
        </select>

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '14px', cursor: 'pointer' }}
        >
          <option value="Tinggi">🔴 Prioritas Tinggi</option>
          <option value="Sedang">🟡 Prioritas Sedang</option>
          <option value="Rendah">🟢 Prioritas Rendah</option>
        </select>
      </div>

      <div>
        <label style={{ fontSize: '12px', fontWeight: '600', color: '#64748b', marginBottom: '4px', display: 'block' }}>
          Tanggal Deadline:
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
        />
      </div>

      <button
        type="submit"
        style={{ padding: '12px', backgroundColor: '#2563eb', color: '#ffffff', fontWeight: 'bold', fontSize: '14px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '4px' }}
      >
        Tambah Tugas
      </button>
    </form>
  );
}

export default TaskForm;