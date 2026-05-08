import { useState } from 'react'

const initialFlats = [
  // For Rent
  { id: 'F201', flat: '201', floor: 2, type: 'For Rent', size: '2BHK', area: '950 sqft', rent: 18000, contact: 'Rajesh Mehta', phone: '+91 98001 11222', available: 'Immediate', furnished: 'Semi-Furnished', facing: 'East' },
  { id: 'F304', flat: '304', floor: 3, type: 'For Rent', size: '3BHK', area: '1200 sqft', rent: 26000, contact: 'Anita Sharma', phone: '+91 97002 33444', available: '1 Jun 2026', furnished: 'Furnished', facing: 'West' },
  { id: 'F408', flat: '408', floor: 4, type: 'For Rent', size: '1BHK', area: '620 sqft', rent: 11000, contact: 'Vijay Nair', phone: '+91 96003 55666', available: 'Immediate', furnished: 'Unfurnished', facing: 'North' },
  // For Sale
  { id: 'F112', flat: '112', floor: 1, type: 'For Sale', size: '2BHK', area: '980 sqft', price: 5200000, contact: 'Priya Kulkarni', phone: '+91 95004 77888', available: 'Immediate', furnished: 'Semi-Furnished', facing: 'South' },
  { id: 'F505', flat: '505', floor: 5, type: 'For Sale', size: '3BHK', area: '1350 sqft', price: 8500000, contact: 'Sanjay Desai', phone: '+91 94005 99000', available: '15 Jun 2026', furnished: 'Furnished', facing: 'East' },
  { id: 'F310', flat: '310', floor: 3, type: 'For Sale', size: '2BHK', area: '1020 sqft', price: 5800000, contact: 'Meena Joshi', phone: '+91 93006 11333', available: 'Immediate', furnished: 'Unfurnished', facing: 'North' },
]

function fmt(n) { return '₹' + n.toLocaleString('en-IN') }

const furnishedBadge = {
  'Furnished':       'bg-green-500/10 text-green-400 border-green-500/25',
  'Semi-Furnished':  'bg-yellow-500/10 text-yellow-400 border-yellow-500/25',
  'Unfurnished':     'bg-slate-500/10 text-slate-400 border-slate-500/25',
}

function FlatCard({ flat, onRemove }) {
  const isRent = flat.type === 'For Rent'
  return (
    <div className="card border border-navy-700 hover:border-gold-500/30 transition-all p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-serif text-2xl font-bold text-white">{flat.flat}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${
              isRent
                ? 'bg-blue-500/10 text-blue-400 border-blue-500/25'
                : 'bg-gold-500/10 text-gold-400 border-gold-500/25'
            }`}>
              {flat.type}
            </span>
          </div>
          <p className="text-slate-400 text-sm">Floor {flat.floor} · {flat.size} · {flat.area}</p>
        </div>
        <button onClick={() => onRemove(flat.id)} className="text-slate-600 hover:text-red-400 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="text-2xl font-bold font-serif mb-3">
        <span className={isRent ? 'text-blue-300' : 'text-gold-400'}>
          {isRent ? `${fmt(flat.rent)}/mo` : fmt(flat.price)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-1.5 text-xs mb-4">
        <span className="text-slate-500">Facing</span>
        <span className="text-slate-300">{flat.facing}</span>
        <span className="text-slate-500">Available</span>
        <span className="text-slate-300">{flat.available}</span>
        <span className="text-slate-500">Contact</span>
        <span className="text-slate-300">{flat.contact}</span>
        <span className="text-slate-500">Phone</span>
        <span className="text-slate-300">{flat.phone}</span>
      </div>

      <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${furnishedBadge[flat.furnished]}`}>
        {flat.furnished}
      </span>
    </div>
  )
}

export default function VacantFlatsPanel() {
  const [flats, setFlats] = useState(initialFlats)
  const [tab, setTab] = useState('For Rent')
  const [showAdd, setShowAdd] = useState(false)
  const [form, setForm] = useState({
    flat: '', floor: '', type: 'For Rent', size: '2BHK', area: '', rent: '', price: '',
    contact: '', phone: '', available: 'Immediate', furnished: 'Semi-Furnished', facing: 'East',
  })

  const removeFlat = (id) => setFlats(prev => prev.filter(f => f.id !== id))

  const addFlat = () => {
    if (!form.flat || !form.contact) return
    setFlats(prev => [
      ...prev,
      {
        ...form,
        id: 'F' + form.flat,
        floor: parseInt(form.floor) || parseInt(form.flat[0]) || 1,
        rent: parseInt(form.rent) || 0,
        price: parseInt(form.price) || 0,
      },
    ])
    setShowAdd(false)
    setForm({ flat: '', floor: '', type: 'For Rent', size: '2BHK', area: '', rent: '', price: '', contact: '', phone: '', available: 'Immediate', furnished: 'Semi-Furnished', facing: 'East' })
  }

  const visible = flats.filter(f => f.type === tab)
  const rentCount = flats.filter(f => f.type === 'For Rent').length
  const saleCount = flats.filter(f => f.type === 'For Sale').length

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">Vacant Flats</h2>
            <p className="text-slate-400 text-sm">{rentCount} for rent · {saleCount} for sale</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(v => !v)} className="flex items-center gap-2 btn-primary text-sm px-4 py-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Listing
        </button>
      </div>

      {/* Add form */}
      {showAdd && (
        <div className="card border border-gold-500/30 p-5 mb-5 space-y-3">
          <p className="text-white font-medium text-sm">New Flat Listing</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Flat No. (e.g. 302)" value={form.flat} onChange={e => setForm(p => ({ ...p, flat: e.target.value }))} className="input-field text-sm" />
            <select value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))} className="select-field text-sm">
              <option>For Rent</option>
              <option>For Sale</option>
            </select>
            <select value={form.size} onChange={e => setForm(p => ({ ...p, size: e.target.value }))} className="select-field text-sm">
              {['1BHK','2BHK','3BHK','4BHK'].map(s => <option key={s}>{s}</option>)}
            </select>
            <input type="text" placeholder="Area (sqft)" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} className="input-field text-sm" />
            {form.type === 'For Rent'
              ? <input type="number" placeholder="Monthly Rent (₹)" value={form.rent} onChange={e => setForm(p => ({ ...p, rent: e.target.value }))} className="input-field text-sm" />
              : <input type="number" placeholder="Sale Price (₹)" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} className="input-field text-sm" />
            }
            <select value={form.furnished} onChange={e => setForm(p => ({ ...p, furnished: e.target.value }))} className="select-field text-sm">
              {['Furnished','Semi-Furnished','Unfurnished'].map(f => <option key={f}>{f}</option>)}
            </select>
            <input type="text" placeholder="Owner / Contact name" value={form.contact} onChange={e => setForm(p => ({ ...p, contact: e.target.value }))} className="input-field text-sm" />
            <input type="text" placeholder="Phone number" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} className="input-field text-sm" />
            <input type="text" placeholder="Available from" value={form.available} onChange={e => setForm(p => ({ ...p, available: e.target.value }))} className="input-field text-sm" />
          </div>
          <div className="flex gap-2 pt-1">
            <button onClick={addFlat} className="btn-primary text-sm px-4 py-2">Save Listing</button>
            <button onClick={() => setShowAdd(false)} className="btn-secondary text-sm px-4 py-2">Cancel</button>
          </div>
        </div>
      )}

      {/* Tab switcher */}
      <div className="flex gap-2 mb-5">
        {['For Rent', 'For Sale'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
              tab === t
                ? t === 'For Rent'
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                  : 'bg-gold-500/20 text-gold-300 border-gold-500/40'
                : 'bg-transparent border-navy-700 text-slate-400 hover:border-navy-500'
            }`}
          >
            {t === 'For Rent' ? '🔑' : '🏷️'} {t}
            <span className="text-xs opacity-70">({t === 'For Rent' ? rentCount : saleCount})</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-12 text-slate-500">No flats listed {tab.toLowerCase()}.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visible.map(f => <FlatCard key={f.id} flat={f} onRemove={removeFlat} />)}
        </div>
      )}
    </div>
  )
}
