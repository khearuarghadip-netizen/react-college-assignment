import React, { useState, useEffect } from 'react';

// Default Tasks matching Assignment 6 integration
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
  }
];

export default function Assignment7() {
  // Authentication & Session States
  const [currentUser, setCurrentUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);

  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Protected Task Manager States
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' | 'tasks' | 'add'
  const [formHeader, setFormHeader] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formPriority, setFormPriority] = useState('Medium');
  const [formCategory, setFormCategory] = useState('Academic');
  const [formDueDate, setFormDueDate] = useState('2026-08-28');

  // Load Remembered User from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_jwt_token');
    const savedUser = localStorage.getItem('auth_username');
    if (savedToken && savedUser) {
      setJwtToken(savedToken);
      setCurrentUser(savedUser);
    }
  }, []);

  // Compute Password Strength
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: 'None', color: '#64748b' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak', color: '#ef4444' };
    if (score <= 3) return { score: 2, label: 'Medium', color: '#f59e0b' };
    return { score: 3, label: 'Strong', color: '#10b981' };
  };

  const passwordStrength = getPasswordStrength(password);

  // Fake JWT Token Generator
  const generateSimulatedJWT = (user) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({ user, exp: Date.now() + 3600000 }));
    const signature = btoa('simulated_secret_key');
    return `${header}.${payload}.${signature}`;
  };

  // Login Submit Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setErrorMessage('Username is required.');
      return;
    }
    if (!password) {
      setErrorMessage('Password is required.');
      return;
    }

    const token = generateSimulatedJWT(username.trim());
    setCurrentUser(username.trim());
    setJwtToken(token);
    setErrorMessage('');

    if (rememberMe) {
      localStorage.setItem('auth_jwt_token', token);
      localStorage.setItem('auth_username', username.trim());
    }
  };

  // Logout Handler
  const handleLogout = () => {
    setCurrentUser(null);
    setJwtToken(null);
    setUsername('');
    setPassword('');
    localStorage.removeItem('auth_jwt_token');
    localStorage.removeItem('auth_username');
  };

  // Add Task Handler (Protected Dashboard Feature)
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formHeader.trim()) return;

    const newTask = {
      id: `TSK-${Date.now().toString().slice(-4)}`,
      header: formHeader.trim(),
      description: formDescription.trim() || 'No description provided.',
      priority: formPriority,
      category: formCategory,
      raisedDateTime: new Date().toLocaleString(),
      dueDate: formDueDate,
      status: 'Raised'
    };

    setTasks([newTask, ...tasks]);
    setFormHeader('');
    setFormDescription('');
    setCurrentView('tasks');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <div style={styles.topHeader}>
        <div>
          <h2 style={styles.pageTitle}>Authentication & Protected System</h2>
          <p style={styles.pageSubtitle}>
            Assignment 7: Simulated JWT, Password Strength, and Protected Task Manager
          </p>
        </div>

        {currentUser && (
          <div style={styles.userInfoBox}>
            <span style={styles.welcomeText}>
              Welcome, <strong>{currentUser}</strong>
            </span>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </div>
        )}
      </div>

      {/* VIEW: LOGIN FORM (IF NOT AUTHENTICATED) */}
      {!currentUser ? (
        <div style={styles.loginCard}>
          <h3 style={styles.loginTitle}>System Login</h3>
          <p style={styles.loginDesc}>
            Please sign in to access the protected dashboard and tasks.
          </p>

          {errorMessage && <div style={styles.errorAlert}>{errorMessage}</div>}

          <form onSubmit={handleLogin} style={styles.form}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username *</label>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password *</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />

              {/* Password Strength Meter */}
              {password && (
                <div style={styles.strengthWrapper}>
                  <div style={styles.strengthBarContainer}>
                    <div
                      style={{
                        ...styles.strengthBar,
                        width:
                          passwordStrength.score === 1
                            ? '33%'
                            : passwordStrength.score === 2
                            ? '66%'
                            : '100%',
                        backgroundColor: passwordStrength.color
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '12px', color: passwordStrength.color, fontWeight: 'bold' }}>
                    Strength: {passwordStrength.label}
                  </span>
                </div>
              )}
            </div>

            <div style={styles.rememberRow}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                Remember User
              </label>
            </div>

            <button type="submit" style={styles.loginBtn}>
              Sign In to Protected Area
            </button>
          </form>
        </div>
      ) : (
        /* VIEW: PROTECTED DASHBOARD (AUTHENTICATED) */
        <div style={styles.protectedArea}>
          {/* JWT Token Simulation Indicator */}
          <div style={styles.tokenBanner}>
            <span style={{ fontWeight: 'bold', color: '#38bdf8' }}>JWT Token Active:</span>
            <span style={styles.tokenText}>{jwtToken}</span>
          </div>

          {/* Navigation for Protected Views */}
          <div style={styles.navRow}>
            <button
              onClick={() => setCurrentView('dashboard')}
              style={styles.viewBtn(currentView === 'dashboard')}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setCurrentView('tasks')}
              style={styles.viewBtn(currentView === 'tasks')}
            >
              All Tasks ({tasks.length})
            </button>
            <button
              onClick={() => setCurrentView('add')}
              style={styles.viewBtn(currentView === 'add')}
            >
              + Create Task
            </button>
          </div>

          {/* Sub-view: Dashboard */}
          {currentView === 'dashboard' && (
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Total Tasks</span>
                <span style={styles.statValue}>{tasks.length}</span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Pending Tasks</span>
                <span style={{ ...styles.statValue, color: '#f59e0b' }}>
                  {tasks.filter((t) => t.status !== 'Closed').length}
                </span>
              </div>
              <div style={styles.statCard}>
                <span style={styles.statLabel}>Closed Tasks</span>
                <span style={{ ...styles.statValue, color: '#10b981' }}>
                  {tasks.filter((t) => t.status === 'Closed').length}
                </span>
              </div>
            </div>
          )}

          {/* Sub-view: Task List */}
          {currentView === 'tasks' && (
            <div style={styles.taskListContainer}>
              {tasks.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#94a3b8' }}>No tasks found.</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} style={styles.taskCard}>
                    <div>
                      <h4 style={{ margin: '0 0 6px 0', color: '#f8fafc' }}>{task.header}</h4>
                      <p style={{ margin: '0 0 8px 0', fontSize: '13px', color: '#94a3b8' }}>
                        {task.description}
                      </p>
                      <span style={styles.metaBadge}>{task.category}</span>
                      <span style={styles.metaBadge}>{task.priority} Priority</span>
                      <span style={{ fontSize: '12px', color: '#cbd5e1', marginLeft: '10px' }}>
                        Due: {task.dueDate}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      style={styles.deleteBtn}
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Sub-view: Add Task Form */}
          {currentView === 'add' && (
            <form onSubmit={handleAddTask} style={styles.addForm}>
              <h3 style={{ margin: '0 0 16px 0', color: '#38bdf8' }}>New Protected Task</h3>
              <input
                type="text"
                required
                placeholder="Task Header *"
                value={formHeader}
                onChange={(e) => setFormHeader(e.target.value)}
                style={styles.input}
              />
              <textarea
                rows="3"
                placeholder="Task Description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                style={styles.input}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <select
                  value={formPriority}
                  onChange={(e) => setFormPriority(e.target.value)}
                  style={styles.input}
                >
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  style={styles.input}
                >
                  <option value="Academic">Academic</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>
              <input
                type="date"
                value={formDueDate}
                onChange={(e) => setFormDueDate(e.target.value)}
                style={styles.input}
              />
              <button type="submit" style={styles.loginBtn}>
                Save Task
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}

// Styling Object
const styles = {
  container: {
    padding: '30px 20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    color: '#f8fafc'
  },
  topHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '25px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  pageTitle: {
    color: '#38bdf8',
    margin: '0 0 4px 0',
    fontSize: '24px'
  },
  pageSubtitle: {
    color: '#94a3b8',
    margin: 0,
    fontSize: '13px'
  },
  userInfoBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    backgroundColor: '#1e293b',
    padding: '8px 14px',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  welcomeText: {
    fontSize: '13px',
    color: '#cbd5e1'
  },
  logoutBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '12px'
  },
  loginCard: {
    backgroundColor: '#1e293b',
    padding: '30px',
    borderRadius: '12px',
    maxWidth: '440px',
    margin: '40px auto',
    border: '1px solid #334155',
    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
  },
  loginTitle: {
    margin: '0 0 6px 0',
    color: '#f8fafc',
    fontSize: '20px'
  },
  loginDesc: {
    margin: '0 0 20px 0',
    color: '#94a3b8',
    fontSize: '13px'
  },
  errorAlert: {
    backgroundColor: '#7f1d1d',
    color: '#fca5a5',
    padding: '10px',
    borderRadius: '6px',
    marginBottom: '15px',
    fontSize: '13px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#cbd5e1'
  },
  input: {
    backgroundColor: '#0f172a',
    border: '1px solid #334155',
    borderRadius: '6px',
    padding: '10px 12px',
    color: '#ffffff',
    fontSize: '14px',
    outline: 'none'
  },
  strengthWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '4px'
  },
  strengthBarContainer: {
    flex: 1,
    height: '6px',
    backgroundColor: '#0f172a',
    borderRadius: '3px',
    overflow: 'hidden'
  },
  strengthBar: {
    height: '100%',
    transition: 'width 0.3s ease'
  },
  rememberRow: {
    display: 'flex',
    alignItems: 'center'
  },
  checkboxLabel: {
    fontSize: '13px',
    color: '#94a3b8',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'pointer'
  },
  loginBtn: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    padding: '12px',
    borderRadius: '6px',
    fontWeight: 'bold',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '6px'
  },
  protectedArea: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  tokenBanner: {
    backgroundColor: '#0f172a',
    border: '1px dashed #38bdf8',
    padding: '10px 14px',
    borderRadius: '8px',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    overflow: 'hidden'
  },
  tokenText: {
    color: '#94a3b8',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap'
  },
  navRow: {
    display: 'flex',
    gap: '10px'
  },
  viewBtn: (active) => ({
    backgroundColor: active ? '#0284c7' : '#1e293b',
    color: active ? '#ffffff' : '#94a3b8',
    border: '1px solid #334155',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px'
  }),
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '16px'
  },
  statCard: {
    backgroundColor: '#1e293b',
    padding: '20px',
    borderRadius: '8px',
    border: '1px solid #334155'
  },
  statLabel: {
    fontSize: '12px',
    color: '#94a3b8',
    textTransform: 'uppercase'
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#38bdf8',
    display: 'block',
    marginTop: '6px'
  },
  taskListContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  taskCard: {
    backgroundColor: '#1e293b',
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #334155',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  metaBadge: {
    fontSize: '11px',
    padding: '2px 8px',
    borderRadius: '4px',
    backgroundColor: '#0f172a',
    color: '#38bdf8',
    border: '1px solid #334155',
    marginRight: '6px'
  },
  deleteBtn: {
    backgroundColor: '#ef4444',
    color: '#ffffff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  addForm: {
    backgroundColor: '#1e293b',
    padding: '24px',
    borderRadius: '8px',
    border: '1px solid #334155',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    maxWidth: '550px'
  }
};