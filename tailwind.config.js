const watchmen = [
  {
    id: 'PE-W001',
    name: 'Ramesh Kumar',
    role: 'Watchman-1',
    shift: 'Day Shift  (6 AM – 6 PM)',
    phone: '+91 98765 43210',
    joined: '12 Jan 2021',
    address: 'Sector 4, Nagpur',
    status: 'on-duty',
    age: 38,
    initials: 'RK',
    color: 'from-blue-600 to-blue-800',
  },
  {
    id: 'PE-W002',
    name: 'Suresh Patil',
    role: 'Watchman-2',
    shift: 'Night Shift (6 PM – 6 AM)',
    phone: '+91 91234 56789',
    joined: '03 Mar 2022',
    address: 'Gadge Nagar, Nagpur',
    status: 'off-duty',
    age: 44,
    initials: 'SP',
    color: 'from-indigo-600 to-indigo-800',
  },
]

function IDCard({ w }) {
  return (
    <div className="card border border-navy-600 overflow-hidden">
      {/* Card Header stripe */}
      <div className={`bg-gradient-to-r ${w.color} px-5 pt-5 pb-10 relative`}>
        <div className="absolute top-3 right-3 text-xs font-bold tracking-widest text-white/50 uppercase">
          Prithvi Elegance
        </div>
        <div className="text-xs text-white/70 font-semibold tracking-widest uppercase mb-1">
          Security Personnel ID
        </div>
        <div className="text-white font-mono text-lg font-bold tracking-wider">{w.id}</div>
      </div>

      {/* Avatar overlapping stripe */}
      <div className="px-5 pb-5">
        <div className="flex items-end gap-4 -mt-8 mb-4">
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${w.color} border-2 border-navy-600 shadow-xl flex items-center justify-center text-white font-bold text-xl font-serif shrink-0`}>
            {w.initials}
          </div>
          <div className="pb-1">
            <h3 className="text-white font-semibold text-lg leading-tight">{w.name}</h3>
            <p className="text-slate-400 text-sm">{w.role}</p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <Row icon="🕐" label="Shift" value={w.shift} />
          <Row icon="📞" label="Phone" value={w.phone} />
          <Row icon="📅" label="Joined" value={w.joined} />
          <Row icon="🏠" label="Address" value={w.address} />
          <Row icon="🎂" label="Age" value={`${w.age} years`} />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
            w.status === 'on-duty'
              ? 'bg-green-500/15 text-green-400 border border-green-500/30'
              : 'bg-slate-500/15 text-slate-400 border border-slate-600'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${w.status === 'on-duty' ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
            {w.status === 'on-duty' ? 'On Duty' : 'Off Duty'}
          </span>
          <span className="text-xs text-slate-600 font-mono">ID: {w.id}</span>
        </div>
      </div>
    </div>
  )
}

function Row({ icon, label, value }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-base shrink-0 mt-0.5">{icon}</span>
      <span className="text-slate-500 w-16 shrink-0">{label}</span>
      <span className="text-slate-200">{value}</span>
    </div>
  )
}

export default function WatchmanPanel() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">Security Personnel</h2>
          <p className="text-slate-400 text-sm">Night watchman photo ID cards</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {watchmen.map(w => <IDCard key={w.id} w={w} />)}
      </div>
    </div>
  )
}
