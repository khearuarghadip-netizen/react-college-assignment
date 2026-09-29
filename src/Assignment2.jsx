import React, { useState } from 'react';

// Student Card Component
function StudentCard({ student }) {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      border: '1px solid #e2e8f0',
      width: '230px'
    }}>
      <img
        src={student.photo}
        alt={student.name}
        style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #6366f1' }}
      />
      <h3 style={{ margin: '8px 0', fontSize: '18px', color: '#0f172a' }}>{student.name}</h3>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748b' }}><strong>Roll:</strong> {student.roll}</p>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748b' }}><strong>Dept:</strong> {student.dept}</p>
      <p style={{ margin: '4px 0', fontSize: '13px', color: '#64748b' }}><strong>Semester:</strong> {student.sem}</p>
      <div style={{ marginTop: '12px', padding: '6px', backgroundColor: '#eef2ff', borderRadius: '6px' }}>
        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#4338ca' }}>CGPA: {student.cgpa}</span>
      </div>
    </div>
  );
}

// Assignment 2 Main Component
export default function Assignment2() {
  const initialStudents = [
    { name: "Arghadip Khearu", roll: "231001102286", dept: "BCA", sem: "4th", cgpa: 9.15, photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150" },
    { name: "Riya Sen", roll: "231001102290", dept: "BCA", sem: "4th", cgpa: 8.80, photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" },
    { name: "Suman Das", roll: "231001102302", dept: "BCA", sem: "4th", cgpa: 9.45, photo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150" },
    { name: "Priya Ghosh", roll: "231001102315", dept: "BCA", sem: "4th", cgpa: 8.65, photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150" }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [isAsc, setIsAsc] = useState(false);

  const handleSort = () => {
    const sorted = [...students].sort((a, b) => isAsc ? a.cgpa - b.cgpa : b.cgpa - a.cgpa);
    setStudents(sorted);
    setIsAsc(!isAsc);
  };

  return (
    <div style={{ textAlign: 'center', padding: '25px', backgroundColor: '#f8fafc', minHeight: '80vh' }}>
      <h2 style={{ color: '#0f172a', marginBottom: '8px' }}>Student Information Management</h2>
      <p style={{ color: '#64748b', marginBottom: '20px' }}>Assignment 2: Props & Data Passing</p>

      <button
        onClick={handleSort}
        style={{
          backgroundColor: '#4f46e5',
          color: 'white',
          border: 'none',
          padding: '10px 22px',
          fontSize: '14px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginBottom: '25px'
        }}
      >
        Sort by CGPA ({isAsc ? "Low to High ↑" : "High to Low ↓"})
      </button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
        {students.map((student) => (
          <StudentCard key={student.roll} student={student} />
        ))}
      </div>
    </div>
  );
}