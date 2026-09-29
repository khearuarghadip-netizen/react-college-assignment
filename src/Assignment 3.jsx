import React, { useState } from 'react';

// Initial Farm Employee Data
const initialEmployees = [
  {
    id: "EMP101",
    name: "Rahul Sharma",
    dept: "Dairy Farming",
    gender: "Male",
    phone: "9876543210",
    localAddress: "Kolkata, WB",
    permAddress: "Patna, Bihar"
  },
  {
    id: "EMP102",
    name: "Ananya Roy",
    dept: "Crop Production",
    gender: "Female",
    phone: "9876501234",
    localAddress: "Burdwan, WB",
    permAddress: "Burdwan, WB"
  },
  {
    id: "EMP103",
    name: "Vikram Das",
    dept: "Logistics",
    gender: "Male",
    phone: "9812345678",
    localAddress: "Howrah, WB",
    permAddress: "Ranchi, Jharkhand"
  }
];

export default function Assignment3() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");

  // Form State
  const [form, setForm] = useState({
    id: "",
    name: "",
    dept: "Dairy Farming",
    gender: "Male",
    phone: "",
    localAddress: "",
    permAddress: ""
  });

  const [editingId, setEditingId] = useState(null);

  // Add or Edit Employee Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.id || !form.name) return;

    if (editingId) {
      setEmployees(employees.map(emp => emp.id === editingId ? form : emp));
      setEditingId(null);
    } else {
      if (employees.some(emp => emp.id === form.id)) {
        alert("Employee ID already exists!");
        return;
      }
      setEmployees([...employees, form]);
    }

    // Reset Form
    setForm({
      id: "",
      name: "",
      dept: "Dairy Farming",
      gender: "Male",
      phone: "",
      localAddress: "",
      permAddress: ""
    });
  };

  // Delete Employee Handler
  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  // Edit Mode Setup
  const handleEdit = (emp) => {
    setEditingId(emp.id);
    setForm(emp);
  };

  // Filter and Search
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === "All" || emp.dept === selectedDept;
    return matchesSearch && matchesDept;
  });

  return (
    <div style={{ padding: '25px', backgroundColor: '#f8fafc', minHeight: '85vh', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <h2 style={{ color: '#0f172a', margin: '0 0 6px 0' }}>Farm Employee Directory</h2>
        <p style={{ color: '#64748b', margin: 0, fontSize: '14px' }}>Assignment 3: State & Event Handling</p>
      </div>

      {/* Control Bar: Employee Count, Search & Filter */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px',
        backgroundColor: 'white',
        padding: '15px 20px',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e293b' }}>
          Total Employees: <span style={{ color: '#4f46e5', fontSize: '18px' }}>{employees.length}</span>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
          />

          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
          >
            <option value="All">All Departments</option>
            <option value="Dairy Farming">Dairy Farming</option>
            <option value="Crop Production">Crop Production</option>
            <option value="Logistics">Logistics</option>
          </select>
        </div>
      </div>

      {/* Add / Edit Employee Form */}
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        marginBottom: '25px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '12px'
      }}>
        <input
          required
          disabled={editingId !== null}
          placeholder="Employee ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />
        <input
          required
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />
        <select
          value={form.dept}
          onChange={(e) => setForm({ ...form, dept: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        >
          <option value="Dairy Farming">Dairy Farming</option>
          <option value="Crop Production">Crop Production</option>
          <option value="Logistics">Logistics</option>
        </select>
        <select
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />
        <input
          placeholder="Local Address"
          value={form.localAddress}
          onChange={(e) => setForm({ ...form, localAddress: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />
        <input
          placeholder="Permanent Address"
          value={form.permAddress}
          onChange={(e) => setForm({ ...form, permAddress: e.target.value })}
          style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
        />

        <button
          type="submit"
          style={{
            backgroundColor: editingId ? '#0284c7' : '#16a34a',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '10px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          {editingId ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>

      {/* Employee List Table */}
      <div style={{ overflowX: 'auto', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
              <th style={{ padding: '12px' }}>ID</th>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Department</th>
              <th style={{ padding: '12px' }}>Gender</th>
              <th style={{ padding: '12px' }}>Phone</th>
              <th style={{ padding: '12px' }}>Local Address</th>
              <th style={{ padding: '12px' }}>Permanent Address</th>
              <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '12px', fontWeight: 'bold' }}>{emp.id}</td>
                <td style={{ padding: '12px' }}>{emp.name}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ backgroundColor: '#e0e7ff', color: '#3730a3', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    {emp.dept}
                  </span>
                </td>
                <td style={{ padding: '12px' }}>{emp.gender}</td>
                <td style={{ padding: '12px' }}>{emp.phone || "N/A"}</td>
                <td style={{ padding: '12px' }}>{emp.localAddress || "N/A"}</td>
                <td style={{ padding: '12px' }}>{emp.permAddress || "N/A"}</td>
                <td style={{ padding: '12px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleEdit(emp)}
                    style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginRight: '6px', fontSize: '12px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(emp.id)}
                    style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}