import React, { useState } from 'react';

const INITIAL_TASKS = [
  {
    id: 'TSK-101',
    header: 'Finalize Semester Project Architecture',
    description: 'Design database schema and component breakdown for the minor project evaluation.',
    priority: 'High',
    category: 'Academic',
    raisedDateTime: '2026-09-28 10:30 AM',
    dueDate: '2026-10-15',
    status: 'Pending'
  },
  {
    id: 'TSK-102',
    header: 'Purchase Essential Study Materials',
    description: 'Procure recommended reference textbooks for Advanced Database Management Systems.',
    priority: 'Medium',
    category: 'Personal',
    raisedDateTime: '2026-09-29 02:15 PM',
    dueDate: '2026-10-05',
    status: 'Raised'
  },
  {
    id: 'TSK-103',
    header: 'Deploy React Labs Portfolio on Vercel',
    description: 'Set up continuous deployment pipeline via GitHub repository integration.',
    priority: 'High',
    category: 'Academic',
    raisedDateTime: '2026-09-27 11:00 AM',
    dueDate: '2026-08-28',
    status: 'Closed'
  }
];

export default function Assignment6() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const [formHeader, setFormHeader] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formCategory, setFormCategory] = useState('Academic');
  const [formDueDate, setFormDueDate] = useState('2026-08-28');

  const [filterCategory, setFilterCategory] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');

  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!formHeader.trim()) return;

    const newTask = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      header: formHeader.trim(),
      description: formDescription.trim() || 'No description provided.',
      priority: formPriority,
      category: formCategory,
      raisedDateTime: getCurrentDateTime(),
      dueDate: formDueDate,
      status: 'Raised'
    };

    setTasks([newTask, ...tasks]);
    setFormHeader('');
    setFormDescription('');
    setFormPriority('Medium');
    setFormCategory('Academic');
    setFormDueDate('2026-08-28');
    setCurrentView('tasks');
  };

  const handleUpdateStatus = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    if (selectedTaskId === taskId) {
      setSelectedTaskId(null);
      setCurrentView('tasks');
    }
  };

  const handleViewDetails = (taskId) => {
    setSelectedTaskId(taskId);
    setCurrentView('details');
  };

  const totalCount = tasks.length;
  const raisedCount = tasks.filter((t) => t.status === 'Raised').length;
  const pendingCount = tasks.filter((t) => t.status === 'Pending').length;
  const closedCount = tasks.filter((t) => t.status === 'Closed').length;

  const visibleTasks = tasks.filter((task) => {
    if (currentView === 'completed') {
      return task.status === 'Closed';
    }
    const matchCategory = filterCategory === 'All' || task.category === filterCategory;
    const matchPriority = filterPriority === 'All' || task.priority === filterPriority;
    return matchCategory && matchPriority;
  });

  const selectedTask = tasks.find((t) => t.id === selectedTaskId);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleRow}>
          <h2 style={styles.appTitle}>Task Manager Application</h2>
          <span style={styles.versionBadge}>Assignment 6</span>
        </div>
        <p style={styles.appSubtitle}>
          Single-page Task Manager application with filtering and lifecycle views.
        </p>

        <nav style={styles.navbar}>
          <button
            onClick={() => setCurrentView('dashboard')}
            style={styles.navButton(currentView === 'dashboard')}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('tasks')}
            style={styles.navButton(currentView === 'tasks')}
          >
            All Tasks ({totalCount})
          </button>
          <button
            onClick={() => setCurrentView('add')}
            style={styles.navButton(currentView === 'add')}
          >
            + Add Task
          </button>
          <button
            onClick={() => setCurrentView('completed')}
            style={styles.navButton(currentView === 'completed')}
          >
            Completed Tasks ({closedCount})
          </button>
        </nav>
      </header>

      <main>
        {currentView === 'dashboard' && (
          <div>
            <h3 style={styles.sectionHeading}>System Overview</h3>
            <div style={styles.statsGrid}>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #38bdf8' }}>
                <span style={styles.statLabel}>Total Tasks</span>
                <span style={styles.statValue}>{totalCount}</span>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #facc15' }}>
                <span style={styles.statLabel}>Raised Tasks</span>
                <span style={{ ...styles.statValue, color: '#facc15' }}>{raisedCount}</span>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #fb923c' }}>
                <span style={styles.statLabel}>Pending Tasks</span>
                <span style={{ ...styles.statValue, color: '#fb923c' }}>{pendingCount}</span>
              </div>
              <div style={{ ...styles.statCard, borderLeft: '4px solid #4ade80' }}>
                <span style={styles.statLabel}>Closed Tasks</span>
                <span style={{ ...styles.statValue, color: '#4ade80' }}>{closedCount}</span>
              </div>
            </div>
          </div>
        )}

        {(currentView === 'tasks' || currentView === 'completed') && (
          <div>
            <div style={styles.listHeaderRow}>
              <h3 style={styles.sectionHeading}>
                {currentView === 'completed' ? 'Completed Tasks' : 'All Tasks'}
              </h3>
              {currentView === 'tasks' && (
                <div style={styles.filtersRow}>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="All">All Categories</option>
                    <option value="Academic">Academic</option>
                    <option value="Personal">Personal</option>
                  </select>
                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    style={styles.selectInput}
                  >
                    <option value="All">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              )}
            </div>

            <div style={styles.taskGrid}>
              {visibleTasks.map((task) => (
                <div key={task.id} style={styles.taskCard}>
                  <div style={styles.cardTopRow}>
                    <span style={styles.taskIdBadge}>{task.id}</span>
                    <span style={styles.priorityPill(task.priority)}>{task.priority}</span>
                  </div>
                  <h4 style={styles.taskCardTitle}>{task.header}</h4>
                  <p style={styles.taskCardDesc}>{task.description}</p>
                  <div style={styles.taskMetadataRow}>
                    <span>Category: {task.category}</span>
                    <span>Due: {task.dueDate}</span>
                  </div>
                  <div style={styles.cardActionsRow}>
                    <button
                      onClick={() => handleViewDetails(task.id)}
                      style={styles.detailsBtn}
                    >
                      Details
                    </button>
                    {task.status !== 'Closed' && (
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
                        style={styles.statusDropdown}
                      >
                        <option value="Raised">Raised</option>
                        <option value="Pending">Pending</option>
                        <option value="Closed">Closed</option>
                      </select>
                    )}
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'add' && (
          <form onSubmit={handleCreateTask} style={styles.formContainer}>
            <h3 style={styles.sectionHeading}>Add New Task</h3>
            <input
              type="text"
              required
              placeholder="Task Header"
              value={formHeader}
              onChange={(e) => setFormHeader(e.target.value)}
              style={styles.textInput}
            />
            <textarea
              rows="3"
              placeholder="Task Description"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              style={styles.textArea}
            />
            <div style={styles.formRowTwoCol}>
              <select
                value={formPriority}
                onChange={(e) => setFormPriority(e.target.value)}
                style={styles.selectInput}
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                style={styles.selectInput}
              >
                <option value="Academic">Academic</option>
                <option value="Personal">Personal</option>
              </select>
            </div>
            <input
              type="date"
              value={formDueDate}
              onChange={(e) => setFormDueDate(e.target.value)}
              style={styles.textInput}
            />
            <button type="submit" style={styles.submitBtn}>Submit Task</button>
          </form>
        )}

        {currentView === 'details' && selectedTask && (
          <div style={styles.detailsCard}>
            <button onClick={() => setCurrentView('tasks')} style={styles.backButton}>
              &larr; Back
            </button>
            <h3>{selectedTask.header}</h3>
            <p>{selectedTask.description}</p>
            <p><strong>Status:</strong> {selectedTask.status}</p>
            <p><strong>Priority:</strong> {selectedTask.priority}</p>
            <p><strong>Category:</strong> {selectedTask.category}</p>
            <p><strong>Raised Date:</strong> {selectedTask.raisedDateTime}</p>
            <p><strong>Due Date:</strong> {selectedTask.dueDate}</p>
          </div>
        )}
      </main>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
    color: '#f8fafc',
    fontFamily: 'sans-serif'
  },
  header: { marginBottom: '25px' },
  headerTitleRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  appTitle: { color: '#38bdf8', margin: 0, fontSize: '24px' },
  versionBadge: {
    backgroundColor: '#1e293b',
    color: '#38bdf8',
    padding: '3px 8px',
    borderRadius: '12px',
    fontSize: '11px'
  },
  appSubtitle: { color: '#94a3b8', margin: '6px 0 16px 0', fontSize: '13px' },
  navbar: {
    display: 'flex',
    gap: '8px',
    backgroundColor: '#1e293b',
    padding: '8px',
    borderRadius: '8px'
  },
  navButton: (active) => ({
    backgroundColor: active ? '#0284c7' : 'transparent',
    color: '#ffffff',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px'
  }),
  sectionHeading: { color: '#f1f5f9', margin: '0 0 16px 0', fontSize: '18px' },
  statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' },
  statCard: {
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  statLabel: { fontSize: '12px', color: '#94a3b8' },
  statValue: { fontSize: '28px', fontWeight: 'bold', display: 'block', marginTop: '4px' },
  listHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
  filtersRow: { display: 'flex', gap: '10px' },
  selectInput: {
    backgroundColor: '#1e293b',
    color: '#fff',
    border: '1px solid #334155',
    padding: '8px',
    borderRadius: '6px'
  },
  taskGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' },
  taskCard: {
    backgroundColor: '#1e293b',
    borderRadius: '8px',
    padding: '16px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column'
  },
  cardTopRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '8px' },
  taskIdBadge: { fontSize: '11px', color: '#38bdf8', fontWeight: 'bold' },
  priorityPill: (priority) => ({
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '6px',
    backgroundColor: priority === 'High' ? '#7f1d1d' : '#78350f',
    color: '#fff'
  }),
  taskCardTitle: { margin: '0 0 6px 0', color: '#fff', fontSize: '15px' },
  taskCardDesc: { fontSize: '12px', color: '#94a3b8', flex: 1, margin: '0 0 10px 0' },
  taskMetadataRow: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#cbd5e1', marginBottom: '12px' },
  cardActionsRow: { display: 'flex', gap: '8px', alignItems: 'center' },
  detailsBtn: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' },
  statusDropdown: { backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '5px', borderRadius: '4px' },
  deleteBtn: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' },
  formContainer: { backgroundColor: '#1e293b', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' },
  textInput: { padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' },
  textArea: { padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' },
  formRowTwoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' },
  submitBtn: { backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  detailsCard: { backgroundColor: '#1e293b', padding: '24px', borderRadius: '8px', maxWidth: '600px' },
  backButton: { background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', padding: 0, marginBottom: '12px' }
};