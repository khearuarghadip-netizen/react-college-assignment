import React, { useState, useEffect } from 'react';

const INITIAL_EXPENSES = [
  { id: '1', title: 'Monthly Stipend', amount: 12000, type: 'Income', category: 'Salary', date: '2026-09-01' },
  { id: '2', title: 'Room Rent', amount: 4000, type: 'Expense', category: 'Rent', date: '2026-09-05' },
  { id: '3', title: 'College Books', amount: 1500, type: 'Expense', category: 'Education', date: '2026-09-12' },
  { id: '4', title: 'Food & Cafeteria', amount: 900, type: 'Expense', category: 'Food', date: '2026-09-18' }
];

export default function Assignment8() {
  const [list, setList] = useState(() => {
    const saved = localStorage.getItem('app_expenses');
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [category, setCategory] = useState('Food');
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    localStorage.setItem('app_expenses', JSON.stringify(list));
  }, [list]);

  const totalIncome = list
    .filter((i) => i.type === 'Income')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const totalExpense = list
    .filter((i) => i.type === 'Expense')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  const balance = totalIncome - totalExpense;

  const handleAdd = (e) => {
    e.preventDefault();
    if (!title.trim() || !amount) return;

    const newItem = {
      id: Date.now().toString(),
      title: title.trim(),
      amount: Number(amount),
      type,
      category,
      date: new Date().toISOString().split('T')[0]
    };

    setList([newItem, ...list]);
    setTitle('');
    setAmount('');
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  const exportCSV = () => {
    const header = 'Title,Amount,Type,Category,Date\n';
    const rows = list.map((i) => `"${i.title}",${i.amount},"${i.type}","${i.category}","${i.date}"`).join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Expenses.csv';
    a.click();
  };

  const filtered = list.filter((i) => {
    const matchCat = filterCat === 'All' || i.category === filterCat;
    const matchSearch = i.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#38bdf8', marginBottom: '8px' }}>Expense Tracker SPA</h2>
      <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px' }}>
        Assignment 8: Expense Tracker with LocalStorage & Analytics
      </p>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Income</span>
          <h3 style={{ margin: '6px 0 0 0', color: '#10b981' }}>₹{totalIncome}</h3>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Total Expense</span>
          <h3 style={{ margin: '6px 0 0 0', color: '#ef4444' }}>₹{totalExpense}</h3>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #38bdf8' }}>
          <span style={{ fontSize: '12px', color: '#94a3b8' }}>Net Balance</span>
          <h3 style={{ margin: '6px 0 0 0', color: '#38bdf8' }}>₹{balance}</h3>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Form */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ marginTop: 0, fontSize: '16px', color: '#f1f5f9' }}>Add Transaction</h3>
          <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input
              type="text"
              required
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
            />
            <input
              type="number"
              required
              placeholder="Amount (₹)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ flex: 1, padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ flex: 1, padding: '8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
              >
                <option value="Food">Food</option>
                <option value="Rent">Rent</option>
                <option value="Education">Education</option>
                <option value="Salary">Salary</option>
              </select>
            </div>
            <button
              type="submit"
              style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Add Entry
            </button>
          </form>
        </div>

        {/* List & Filter */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', color: '#f1f5f9' }}>History</h3>
            <button
              onClick={exportCSV}
              style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
            >
              Export CSV
            </button>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ flex: 1, padding: '6px 8px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
            />
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              style={{ padding: '6px', backgroundColor: '#0f172a', border: '1px solid #334155', color: '#fff', borderRadius: '4px' }}
            >
              <option value="All">All</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Education">Education</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '250px', overflowY: 'auto' }}>
            {filtered.map((item) => (
              <div
                key={item.id}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: '#0f172a', borderRadius: '4px' }}
              >
                <div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>{item.title}</div>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{item.category} • {item.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: item.type === 'Income' ? '#10b981' : '#ef4444', fontWeight: 'bold' }}>
                    {item.type === 'Income' ? '+' : '-'}₹{item.amount}
                  </span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '14px' }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}