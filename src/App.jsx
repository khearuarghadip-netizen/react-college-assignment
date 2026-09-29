import React, { useState } from 'react';
import Assignment1 from './Assignment1';
import Assignment2 from './Assignment2';
import Assignment3 from './Assignment3';
import Assignment4 from './Assignment4';
import Assignment5 from './Assignment5';
import Assignment6 from './Assignment6';
import Assignment7 from './Assignment7';

export default function App() {
  const [activeTab, setActiveTab] = useState(7); // Default to Assignment 7

  return (
    <div style={{ fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif', minHeight: '100vh', margin: 0, padding: 0, backgroundColor: '#0b1120' }}>
      {/* Top Navigation Bar */}
      <nav style={{ backgroundColor: '#0f172a', padding: '14px 10px', display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', borderBottom: '1px solid #1e293b' }}>
        <button
          onClick={() => setActiveTab(1)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 1 ? '#38bdf8' : '#334155',
            color: activeTab === 1 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 1
        </button>

        <button
          onClick={() => setActiveTab(2)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 2 ? '#38bdf8' : '#334155',
            color: activeTab === 2 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 2
        </button>

        <button
          onClick={() => setActiveTab(3)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 3 ? '#38bdf8' : '#334155',
            color: activeTab === 3 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 3
        </button>

        <button
          onClick={() => setActiveTab(4)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 4 ? '#38bdf8' : '#334155',
            color: activeTab === 4 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 4
        </button>

        <button
          onClick={() => setActiveTab(5)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 5 ? '#38bdf8' : '#334155',
            color: activeTab === 5 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 5
        </button>

        <button
          onClick={() => setActiveTab(6)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 6 ? '#38bdf8' : '#334155',
            color: activeTab === 6 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 6
        </button>

        <button
          onClick={() => setActiveTab(7)}
          style={{
            padding: '8px 14px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '700',
            fontSize: '12px',
            backgroundColor: activeTab === 7 ? '#38bdf8' : '#334155',
            color: activeTab === 7 ? '#0f172a' : '#ffffff'
          }}
        >
          Assignment 7: Auth System
        </button>
      </nav>

      {/* Main View Area */}
      <main>
        {activeTab === 1 && <Assignment1 />}
        {activeTab === 2 && <Assignment2 />}
        {activeTab === 3 && <Assignment3 />}
        {activeTab === 4 && <Assignment4 />}
        {activeTab === 5 && <Assignment5 />}
        {activeTab === 6 && <Assignment6 />}
        {activeTab === 7 && <Assignment7 />}
      </main>
    </div>
  );
}