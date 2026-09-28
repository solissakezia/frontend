import React, { useState, useEffect } from 'react';

function EditTaskModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Kuliah');
  const [priority, setPriority] = useState('Sedang');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setCategory(task.category || 'Kuliah');
      setPriority(task.priority || 'Sedang');
      setDueDate(task.dueDate || '');
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave(task.id, { title, category, priority, dueDate });
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', width: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}>
        <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '1.2rem', color: '#0f172a' }}>Edit Tugas</h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Judul Tugas:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Kategori:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="Kuliah">Kuliah</option>
                <option value="Pribadi">Pribadi</option>
                <option value="Proyek">Proyek</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Prioritas:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '14px', cursor: 'pointer', boxSizing: 'border-box' }}
              >
                <option value="Tinggi">🔴 Tinggi</option>
                <option value="Sedang">🟡 Sedang</option>
                <option value="Rendah">🟢 Rendah</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '600', display: 'block', marginBottom: '6px' }}>Deadline:</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', backgroundColor: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
              Batal
            </button>
            <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;