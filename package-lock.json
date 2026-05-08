import { useState } from 'react'

const MONTH = 'May 2026'

const initialExpenses = [
  {
    id: 'electricity',
    label: 'Electricity',
    icon: '⚡',
    color: 'yellow',
    allocated: 18000,
    spent: 13540,
    description: 'Common area & lift power bill',
  },
  {
    id: 'diesel',
    label: 'Diesel (Generator)',
    icon: '🛢️',
    color: 'orange',
    allocated: 8000,
    spent: 5200,
    description: 'Backup generator fuel',
  },
  {
    id: 'gardening',
    label: 'Gardening',
    icon: '🌿',
    color: 'green',
    allocated: 4000,
    spent: 3800,
    description: 'Landscaping & plant care',
  },
  {
    id: 'salaries',
    label: 'Watchman Salaries',
    icon: '👮',
    color: 'blue',
    allocated: 24000,
    spent: 24000,
    description: 'Watchman-1 & Watchman-2 monthly pay',
  },
  {
    id: 'repairs',
    label: 'Apartment Repairs',
    icon: '🔧',
    color: 'red',
    allocated: 12000,
    spent: 7650,
    description: 'Common area maintenance & fixes',
  },
]

const colorMap = {
  yellow: { bar: 'bg-yellow-400', text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/20' },
  orange: { bar: 'bg-orange-400', text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/20' },
  green:  { bar: 'bg-green-400',  text: 'text-green-400',  bg: 'bg-green-400/10',  border: 'border-green-400/20' },
  blue:   { bar: 'bg-blue-400',   text: 'text-blue-400',   bg: 'bg-blue-400/10',   border: 'border-blue-400/20' },
  red:    { bar: 'bg-red-400',    text: 'text-red-400',    bg: 'bg-red-400/10',    border: 'border-red-400/20' },
}

function fmt(n) {
  return '₹' + n.toLocaleString('en-IN')
}

export default function ExpensesPanel() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [editing, setEditing] = useState(null) // id of row being edited
  const [editVal, setEditVal] = useState('')

  const totalAllocated = expenses.reduce((s, e) => s + e.allocated, 0)
  const totalSpent = expenses.reduce((s, e) => s + e.spent, 0)

  const startEdit = (exp) => {
    setEditing(exp.id)
    setEditVal(String(exp.allocated))
  }

  const saveEdit = (id) => {
    const val = parseInt(editVal, 10)
    if (!isNaN(val) && val >= 0) {
      setExpenses(prev => prev.map(e => e.id === id ? { ...e, allocated: val } : e))
    }
    setEditing(null)
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-gold-500/10 border border-gold-500/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
          </svg>
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">Monthly Expenses</h2>
          <p className="text-slate-400 text-sm">{MONTH} · Budget allocation &amp; tracking</p>
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Allocated', value: fmt(totalAllocated), color: 'text-gold-400' },
          { label: 'Total Spent', value: fmt(totalSpent), color: 'text-white' },
          { label: 'Remaining', value: fmt(totalAllocated - totalSpent), color: totalAllocated - totalSpent >= 0 ? 'text-green-400' : 'text-red-400' },
        ].map(s => (
          <div key={s.label} className="card border border-navy-700 p-4 text-center">
            <p className={`text-xl font-bold font-serif ${s.color}`}>{s.value}</p>
            <p className="text-slate-500 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Expense rows */}
      <div className="space-y-4">
        {expenses.map(exp => {
          const c = colorMap[exp.color]
          const pct = Math.min(100, Math.round((exp.spent / exp.allocated) * 100)) || 0
          const over = exp.spent > exp.allocated
          return (
            <div key={exp.id} className="card border border-navy-700 p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-10 h-10 text-xl rounded-xl ${c.bg} border ${c.border} flex items-center justify-center`}>
                    {exp.icon}
                  </span>
                  <div>
                    <p className="text-white font-medium">{exp.label}</p>
                    <p className="text-slate-500 text-xs">{exp.description}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {editing === exp.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-sm">₹</span>
                      <input
                        type="number"
                        value={editVal}
                        onChange={e => setEditVal(e.target.value)}
                        className="w-28 bg-navy-800 border border-gold-500/50 text-white text-sm rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold-500"
                        autoFocus
                        onKeyDown={e => { if (e.key === 'Enter') saveEdit(exp.id); if (e.key === 'Escape') setEditing(null) }}
                      />
                      <button onClick={() => saveEdit(exp.id)} className="text-green-400 hover:text-green-300 text-xs font-semibold">Save</button>
                      <button onClick={() => setEditing(null)} className="text-slate-500 hover:text-slate-400 text-xs">✕</button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div>
                        <p className={`text-sm font-semibold ${c.text}`}>Allotted: {fmt(exp.allocated)}</p>
                        <p className="text-slate-400 text-xs">Spent: {fmt(exp.spent)}</p>
                      </div>
                      <button
                        onClick={() => startEdit(exp)}
                        title="Edit allocation"
                        className="text-slate-500 hover:text-gold-400 transition-colors ml-1"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                  <span>{pct}% used</span>
                  <span className={over ? 'text-red-400 font-semibold' : 'text-slate-500'}>
                    {over ? `⚠ Over by ${fmt(exp.spent - exp.allocated)}` : `${fmt(exp.allocated - exp.spent)} remaining`}
                  </span>
                </div>
                <div className="h-2 bg-navy-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${over ? 'bg-red-500' : c.bar}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
