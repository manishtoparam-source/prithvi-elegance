import { useState } from 'react'

const PRIORITIES = ['High', 'Medium', 'Low']

const initialActions = [
  { id: 1, title: 'Replace broken corridor light on Floor 3', priority: 'High', assignee: 'Electrician', due: '2026-05-10', done: false, category: 'Repair' },
  { id: 2, title: 'Service water pump in basement', priority: 'High', assignee: 'Plumber', due: '2026-05-12', done: false, category: 'Maintenance' },
  { id: 3, title: 'Collect pending maintenance dues – Flat 204', priority: 'Medium', assignee: 'Treasurer', due: '2026-05-15', done: false, category: 'Finance' },
  { id: 4, title: 'Trim overgrown hedge near Gate 2', priority: 'Low', assignee: 'Gardener', due: '2026-05-14', done: false, category: 'Gardening' },
  { id: 5, title: 'Repaint stairwell walls – Block B', priority: 'Medium', assignee: 'Mason', due: '2026-05-20', done: false, category: 'Repair' },
  { id: 6, title: 'Review & renew security agency contract', priority: 'High', assignee: 'President', due: '2026-05-18', done: false, category: 'Administration' },
  { id: 7, title: 'Inspect terrace drainage before monsoon', priority: 'Medium', assignee: 'Carpenter', due: '2026-05-22', done: false, category: 'Maintenance' },
  { id: 8, title: 'Update resident contact directory', priority: 'Low', assignee: 'Secretary', due: '2026-05-25', done: true, category: 'Administration' },
]

const priorityStyle = {
  High:   { badge: 'bg-red-500/15 text-red-400 border-red-500/30', dot: 'bg-red-500' },
  Medium: { badge: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30', dot: 'bg-yellow-400' },
  Low:    { badge: 'bg-slate-500/15 text-slate-400 border-slate-500/30', dot: 'bg-slate-500' },
}

const catStyle = {
  Repair:         'bg-orange-500/10 text-orange-400',
  Maintenance:    'bg-blue-500/10 text-blue-400',
  Finance:        'bg-gold-500/10 text-gold-400',
  Gardening:      'bg-green-500/10 text-green-400',
  Administration: 'bg-purple-500/10 text-purple-400',
}

export default function PendingActionsPanel() {
  const [actions, setActions] = useState(initialActions)
  const [filter, setFilter] = useState('All')
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAction, setNewAction] = useState({ title: '', priority: 'Medium', assignee: '', due: '', category: 'Repair' })

  const toggleDone = (id) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, done: !a.done } : a))
  }

  const addAction = () => {
    if (!newAction.title.trim()) return
    setActions(prev => [...prev, { ...newAction, id: Date.now(), done: false }])
    setNewAction({ title: '', priority: 'Medium', assignee: '', due: '', category: 'Repair' })
    setShowAddForm(false)
  }

  const removeAction = (id) => setActions(prev => prev.filter(a => a.id !== id))

  const filtered = filter === 'All' ? actions
    : filter === 'Done' ? actions.filter(a => a.done)
    : actions.filter(a => !a.done && a.priority === filter)

  const pending = actions.filter(a => !a.done).length
  const done = actions.filter(a => a.done).length

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Pending Actions</h2>
            <p className="text-slate-400 text-sm">{pending} pending · {done} completed</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(v => !v)}
          className="flex items-center gap-2 btn-primary text-sm px-4 py-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Task
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="card border border-gold-500/30 p-5 mb-5 space-y-3">
          <p className="text-white font-medium text-sm mb-1">New Action Item</p>
          <input
            type="text"
            placeholder="Task description…"
            value={newAction.title}
            onChange={e => setNewAction(p => ({ ...p, title: e.target.value }))}
            className="input-field text-sm"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <select value={newAction.priority} onChange={e => setNewAction(p => ({ ...p, priority: e.target.value }))} className="select-field text-sm">
              {PRIORITIES.map(pr => <option key={pr}>{pr}</option>)}
            </select>
            <input type="text" placeholder="Assignee" value={newAction.assignee} onChange={e => setNewAction(p => ({ ...p, assignee: e.target.value }))} className="input-field text-sm" />
            <input type="date" value={newAction.due} onChange={e => setNewAction(p => ({ ...p, due: e.target.value }))} className="input-field text-sm" />
            <select value={newAction.category} onChange={e => setNewAction(p => ({ ...p, category: e.target.value }))} className="select-field text-sm">
              {['Repair','Maintenance','Finance','Gardening','Administration'].map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={addAction} className="btn-primary text-sm px-4 py-2">Save</button>
            <button onClick={() => setShowAddForm(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {['All', 'High', 'Medium', 'Low', 'Done'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              filter === f
                ? 'bg-gold-500 text-navy-950 border-gold-500'
                : 'bg-transparent border-navy-600 text-slate-400 hover:border-gold-500/50 hover:text-gold-400'
            }`}
          >
            {f}
            {f === 'All' && <span className="ml-1 opacity-70">({actions.length})</span>}
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-slate-500">No tasks in this filter.</div>
        )}
        {filtered.map(action => {
          const ps = priorityStyle[action.priority]
          const cs = catStyle[action.category] || 'bg-slate-500/10 text-slate-400'
          const overdue = action.due && !action.done && new Date(action.due) < new Date()
          return (
            <div
              key={action.id}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                action.done
                  ? 'bg-navy-900/50 border-navy-800 opacity-60'
                  : 'bg-navy-800/60 border-navy-700 hover:border-navy-600'
              }`}
            >
              {/* Checkbox */}
              <button
                onClick={() => toggleDone(action.id)}
                className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                  action.done ? 'bg-green-500 border-green-500' : 'border-navy-500 hover:border-gold-400'
                }`}
              >
                {action.done && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium leading-snug ${action.done ? 'line-through text-slate-500' : 'text-white'}`}>
                  {action.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${ps.badge}`}>
                    <span className={`inline-block w-1.5 h-1.5 rounded-full ${ps.dot} mr-1`} />
                    {action.priority}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${cs}`}>{action.category}</span>
                  {action.assignee && <span className="text-xs text-slate-500">→ {action.assignee}</span>}
                  {action.due && (
                    <span className={`text-xs ${overdue ? 'text-red-400 font-semibold' : 'text-slate-500'}`}>
                      {overdue ? '⚠ Overdue · ' : '📅 '}
                      {new Date(action.due).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  )}
                </div>
              </div>

              {/* Delete */}
              <button
                onClick={() => removeAction(action.id)}
                className="text-slate-600 hover:text-red-400 transition-colors shrink-0 mt-0.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
