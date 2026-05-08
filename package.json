import { useState } from 'react'

const initialContacts = [
  { id: 1, name: 'Mahesh Wani',    trade: 'Electrician', phone: '+91 98101 22334', alt: '+91 70201 44556', rating: 5, available: true,  experience: '12 yrs', area: 'Nagpur Central', note: 'Expert in wiring & panel work. Available 7 AM–8 PM.' },
  { id: 2, name: 'Raju Pawar',     trade: 'Plumber',     phone: '+91 97202 55667', alt: '',               rating: 4, available: true,  experience: '8 yrs',  area: 'Dharampeth',    note: 'Handles leaks, drainage, pipeline fitting.' },
  { id: 3, name: 'Kiran Sawant',   trade: 'Carpenter',   phone: '+91 96303 88990', alt: '+91 80303 11223', rating: 4, available: false, experience: '10 yrs', area: 'Sitabuldi',     note: 'Furniture repair, doors, modular kitchen.' },
  { id: 4, name: 'Ganesh Thakur',  trade: 'Mason',       phone: '+91 95404 11223', alt: '',               rating: 5, available: true,  experience: '15 yrs', area: 'Laxmi Nagar',   note: 'Civil work, tiling, plasterwork & waterproofing.' },
  { id: 5, name: 'Shyam Yadav',    trade: 'Gardener',    phone: '+91 94505 44556', alt: '+91 72005 66778', rating: 4, available: true,  experience: '6 yrs',  area: 'Manish Nagar',  note: 'Pruning, planting, lawn care & pest spray.' },
  { id: 6, name: 'Amit Borse',     trade: 'Painter',     phone: '+91 93606 77889', alt: '',               rating: 4, available: true,  experience: '9 yrs',  area: 'Pratap Nagar',  note: 'Interior & exterior painting, waterproofing coat.' },
  { id: 7, name: 'Dinesh Kamble',  trade: 'Welder',      phone: '+91 92707 00112', alt: '',               rating: 3, available: false, experience: '7 yrs',  area: 'Hingna Road',   note: 'Gate & grill fabrication, MS frame work.' },
  { id: 8, name: 'Pramod Shinde',  trade: 'HVAC / AC',   phone: '+91 91808 33445', alt: '+91 88808 55667', rating: 5, available: true,  experience: '11 yrs', area: 'Bajaj Nagar',   note: 'AC service, installation, duct cleaning.' },
]

const tradeColors = {
  'Electrician': 'from-yellow-600 to-yellow-800',
  'Plumber':     'from-blue-600 to-blue-800',
  'Carpenter':   'from-amber-700 to-amber-900',
  'Mason':       'from-stone-600 to-stone-800',
  'Gardener':    'from-green-600 to-green-800',
  'Painter':     'from-pink-600 to-pink-800',
  'Welder':      'from-red-700 to-red-900',
  'HVAC / AC':   'from-cyan-600 to-cyan-800',
}

const tradeIcons = {
  'Electrician': '⚡',
  'Plumber':     '🔧',
  'Carpenter':   '🪚',
  'Mason':       '🧱',
  'Gardener':    '🌿',
  'Painter':     '🖌️',
  'Welder':      '🔩',
  'HVAC / AC':   '❄️',
}

const TRADES = ['All', 'Electrician', 'Plumber', 'Carpenter', 'Mason', 'Gardener', 'Painter', 'Welder', 'HVAC / AC']

function Stars({ n }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3.5 h-3.5 ${i <= n ? 'text-gold-400' : 'text-navy-600'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function ContactCard({ c, onRemove }) {
  const grad = tradeColors[c.trade] || 'from-slate-600 to-slate-800'
  const icon = tradeIcons[c.trade] || '🔨'
  const initials = c.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <div className="card border border-navy-700 hover:border-gold-500/30 transition-all overflow-hidden">
      {/* Top strip */}
      <div className={`bg-gradient-to-r ${grad} px-5 py-4 flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white font-bold font-serif text-lg">
            {initials}
          </div>
          <div>
            <p className="text-white font-semibold leading-tight">{c.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-base">{icon}</span>
              <span className="text-white/80 text-sm font-medium">{c.trade}</span>
            </div>
          </div>
        </div>
        <button onClick={() => onRemove(c.id)} className="text-white/30 hover:text-white/80 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <Stars n={c.rating} />
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
            c.available
              ? 'bg-green-500/10 text-green-400 border-green-500/25'
              : 'bg-slate-500/10 text-slate-400 border-slate-500/25'
          }`}>
            {c.available ? '✓ Available' : '✗ Unavailable'}
          </span>
        </div>

        <div className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <span className="text-slate-300">{c.phone}</span>
          </div>
          {c.alt && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span className="text-slate-400 text-xs">{c.alt} (alt)</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="text-slate-400 text-xs">{c.area} · {c.experience}</span>
          </div>
        </div>

        {c.note && (
          <p className="text-slate-500 text-xs leading-relaxed border-t border-navy-700 pt-3">{c.note}</p>
        )}
      </div>
    </div>
  )
}

export default function RepairContactsPanel() {
  const [contacts, setContacts] = useState(initialContacts)
  const [filter, setFilter] = useState('All')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({ name: '', trade: 'Electrician', phone: '', alt: '', experience: '', area: '', rating: 4, note: '', available: true })

  const removeContact = (id) => setContacts(prev => prev.filter(c => c.id !== id))

  const addContact = () => {
    if (!form.name || !form.phone) return
    setContacts(prev => [...prev, { ...form, id: Date.now(), rating: parseInt(form.rating) || 4 }])
    setForm({ name: '', trade: 'Electrician', phone: '', alt: '', experience: '', area: '', rating: 4, note: '', available: true })
    setShowAdd(false)
  }

  const visible = filter === 'All' ? contacts : contacts.filter(c => c.trade === filter)

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Repair &amp; Service Contacts</h2>
            <p className="text-slate-400 text-sm">{contacts.length} professionals on file</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(v => !v)} className="flex items-center gap-2 btn-primary text-sm px-4 py-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Contact
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="card border border-gold-500/30 p-5 mb-5 space-y-3">
          <p className="text-white font-medium text-sm">New Repair Contact</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} className="input-field text-sm" />
            <select value={form.trade} onChange={e => setForm(p => ({ ...p, trade: e.target.value }))} className="select-field text-sm">
              {TRADES.slice(1).map(t => <option key={t}>{t}</option>)}
            </select>
            <input type="text" placeholder="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field text-sm" />
            <input type="text" placeholder="Alt phone (optional)" value={form.alt} onChange={e => setForm(p => ({ ...p, alt: e.target.value }))} className="input-field text-sm" />
            <input type="text" placeholder="Experience (e.g. 5 yrs)" value={form.experience} onChange={e => setForm(p => ({ ...p, experience: e.target.value }))} className="input-field text-sm" />
            <input type="text" placeholder="Area / Location" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} className="input-field text-sm" />
            <select value={form.rating} onChange={e => setForm(p => ({ ...p, rating: e.target.value }))} className="select-field text-sm">
              {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>)}
            </select>
            <select value={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.value === 'true' }))} className="select-field text-sm">
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
            <input type="text" placeholder="Note (optional)" value={form.note} onChange={e => setForm(p => ({ ...p, note: e.target.value }))} className="input-field text-sm" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={addContact} className="btn-primary text-sm px-4 py-2">Save Contact</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TRADES.map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
              filter === t
                ? 'bg-gold-500 text-navy-950 border-gold-500'
                : 'bg-transparent border-navy-600 text-slate-400 hover:border-gold-500/50 hover:text-gold-400'
            }`}
          >
            {t !== 'All' && <span className="mr-1">{tradeIcons[t]}</span>}{t}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No contacts found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map(c => <ContactCard key={c.id} c={c} onRemove={removeContact} />)}
        </div>
      )}
    </div>
  )
}
