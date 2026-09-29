import React, { useState } from 'react';
import Assignment1 from './Assignment1';
import Assignment2 from './Assignment2';
import Assignment3 from './Assignment3';
import Assignment4 from './Assignment4';

export default function App() {
  const [activeTab, setActiveTab] = useState(4); // Default vabe Assignment 4 open thakbe

  return (
    <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Top Navigation Bar */}
      <nav style={{ backgroundColor: '#0f172a', padding: '15px', display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab(1)}
          style={{
            padding: '9px 15px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 1 ? '#ab38f8' : '#335455',
            color: activeTab === 1 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 1: Portfolio
        </button>

        <button
          onClick={() => setActiveTab(2)}
          style={{
            padding: '9px 15px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 2 ? '#38bdf8' : '#334155',
            color: activeTab === 2 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 2: Student Portal
        </button>

        <button
          onClick={() => setActiveTab(3)}
          style={{
            padding: '9px 15px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 3 ? '#38bdf8' : '#334155',
            color: activeTab === 3 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 3: Employee Directory
        </button>

        <button
          onClick={() => setActiveTab(4)}
          style={{
            padding: '9px 15px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 'bold',
            backgroundColor: activeTab === 4 ? '#38bdf8' : '#334155',
            color: activeTab === 4 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 4: Weather API
        </button>
      </nav>

      {/* Main Content Area */}
      <main>
        {activeTab === 1 && <Assignment1 />}
        {activeTab === 2 && <Assignment2 />}
        {activeTab === 3 && <Assignment3 />}
        {activeTab === 4 && <Assignment4 />}
      </main>
    </div>
  );
}