import React, { useState } from 'react';
import { initialTasksData } from './data/initialTasks.js';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import EditTaskModal from './components/EditTaskModal';


function App() {
  const [tasks, setTasks] = useState(initialTasksData);
  const [historySessions, setHistorySessions] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' atau 'history'

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [editingTask, setEditingTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Otomatis Cek Jika Semua Tugas di Halaman Utama Sudah 100% Selesai
  const checkCompletionAndArchive = (currentTasks) => {
    if (currentTasks.length > 0 && currentTasks.every((task) => task.completed)) {
      const now = new Date();
      const completedTime = `${now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}, ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
      
      // Pindahkan sesi tugas ini ke History
      setHistorySessions((prev) => [
        { id: Date.now(), title: `Sesi Tugas Selesai (${completedTime})`, tasks: currentTasks },
        ...prev,
      ]);

      // Buat Halaman Tugas Baru yang Kosong
      setTasks([]);
      alert('🎉 Selamat! Semua tugas telah selesai 100%. Halaman ini telah diarsipkan ke menu History, dan halaman baru yang kosong siap digunakan.');
    }
  };

  const handleAddTask = (newTask) => {
    const updated = [newTask, ...tasks];
    setTasks(updated);
    checkCompletionAndArchive(updated);
  };

  const handleToggleComplete = (id) => {
    const updated = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updated);
    checkCompletionAndArchive(updated);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveEdit = (id, updatedData) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, ...updatedData } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all'
        ? true
        : filterStatus === 'completed'
        ? task.completed
        : !task.completed;
    return matchesSearch && matchesStatus;
  });

  const highPriorityTasks = filteredTasks.filter((t) => t.priority === 'Tinggi');
  const regularTasks = filteredTasks.filter((t) => t.priority !== 'Tinggi');

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '30px 40px', backgroundColor: '#f8fafc', color: '#0f172a', boxSizing: 'border-box' }}>
      <Header title="UniTask" />

      {/* Navigasi Halaman Utama vs History */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
        <button
          onClick={() => setActiveTab('active')}
          style={{
            padding: '10px 24px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'active' ? '#2563eb' : '#e2e8f0',
            color: activeTab === 'active' ? '#ffffff' : '#475569',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          📝 Tugas Aktif
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '10px 24px',
            borderRadius: '20px',
            border: 'none',
            backgroundColor: activeTab === 'history' ? '#2563eb' : '#e2e8f0',
            color: activeTab === 'history' ? '#ffffff' : '#475569',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          📜 History Selesai ({historySessions.length})
        </button>
      </div>

      {/* TAB 1: HALAMAN TUGAS AKTIF */}
      {activeTab === 'active' && (
        <>
          <StatsCard tasks={tasks} />

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '24px', alignItems: 'start', width: '100%' }}>
            
            {/* KOLOM KIRI: Daftar Tugas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
              
              {/* BAGIAN TERSENDIRI: PRIORITAS TINGGI */}
              <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(220,38,38,0.06)', border: '1px solid #fecaca', width: '100%', boxSizing: 'border-box' }}>
                <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#dc2626', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🔴 Prioritas Tinggi ({highPriorityTasks.length})
                </h3>
                <TaskList
                  tasks={highPriorityTasks}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                  onEditClick={handleOpenEditModal}
                />
              </div>

              {/* BAGIAN TUGAS LAINNYA */}
              <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
                <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#0f172a', fontSize: '1.2rem' }}>
                  📋 Semua Tugas Lainnya ({regularTasks.length})
                </h3>
                <TaskList
                  tasks={regularTasks}
                  onToggleComplete={handleToggleComplete}
                  onDeleteTask={handleDeleteTask}
                  onEditClick={handleOpenEditModal}
                />
              </div>

            </div>

            {/* KOLOM KANAN: Tambah & Filter */}
            <div style={{ backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', boxSizing: 'border-box' }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#0f172a', textAlign: 'center', fontSize: '1.3rem' }}>
                Tambah & Filter
              </h3>

              <TaskForm onAddTask={handleAddTask} />

              <hr style={{ border: 'none', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />

              <TaskFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
            </div>

          </div>
        </>
      )}

      {/* TAB 2: HALAMAN HISTORY */}
      {activeTab === 'history' && (
        <div style={{ backgroundColor: '#ffffff', padding: '28px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginTop: 0, color: '#0f172a', fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>
            📜 History Tugas Selesai 100%
          </h2>

          {historySessions.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', padding: '40px 0' }}>
              Belum ada arsip sesi tugas yang selesai 100%.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {historySessions.map((session) => (
                <div key={session.id} style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '10px', backgroundColor: '#f8fafc' }}>
                  <h3 style={{ margin: '0 0 12px 0', color: '#16a34a', fontSize: '1.1rem' }}>
                    ✅ {session.title}
                  </h3>
                  <TaskList
                    tasks={session.tasks}
                    onToggleComplete={() => {}}
                    onDeleteTask={() => {}}
                    onEditClick={() => {}}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <EditTaskModal
        task={editingTask}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default App;