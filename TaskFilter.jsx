import React from 'react';

function TaskFilter({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        style={{
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          backgroundColor: '#ffffff',
          fontSize: '14px',
          cursor: 'pointer',
        }}
      >
        <option value="all">Semua Status</option>
        <option value="completed">Selesai</option>
        <option value="pending">Belum Selesai</option>
      </select>

      <input
        type="text"
        placeholder="Cari tugas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          fontSize: '14px',
          outline: 'none',
        }}
      />
    </div>
  );
}

export default TaskFilter;