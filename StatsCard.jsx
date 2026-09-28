import React from 'react';

function StatsCard({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const percentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px 24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#1e293b', fontWeight: '600' }}>
        <div>Total Tugas: <strong>{totalTasks}</strong></div>
        <div>Selesai: <strong style={{ color: '#16a34a' }}>{completedTasks}</strong></div>
        <div>Belum Selesai: <strong style={{ color: '#dc2626' }}>{pendingTasks}</strong></div>
        <div>Progres: <strong>{percentage}%</strong></div>
      </div>

      <div style={{ width: '100%', height: '10px', backgroundColor: '#e2e8f0', borderRadius: '20px', overflow: 'hidden' }}>
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: '#2563eb',
            transition: 'width 0.4s ease-in-out',
            borderRadius: '20px',
          }}
        />
      </div>
    </div>
  );
}

export default StatsCard;