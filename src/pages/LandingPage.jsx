import { useNavigate } from 'react-router-dom'

const roles = [
  {
    key: 'society',
    label: 'Society',
    description: 'President · Vice President · Treasurer',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    gradient: 'from-navy-700 to-navy-800',
    border: 'border-gold-500/40 hover:border-gold-500',
    badge: 'Administration',
  },
  {
    key: 'owner',
    label: 'Owner',
    description: 'Flat Owners · 101–512',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    gradient: 'from-navy-700 to-navy-800',
    border: 'border-gold-500/40 hover:border-gold-500',
    badge: 'Resident',
  },
  {
    key: 'renter',
    label: 'Renter',
    description: 'Tenants · 101–512',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    gradient: 'from-navy-700 to-navy-800',
    border: 'border-gold-500/40 hover:border-gold-500',
    badge: 'Tenant',
  },
  {
    key: 'security',
    label: 'Security',
    description: 'Watchman-1 · Watchman-2',
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    gradient: 'from-navy-700 to-navy-800',
    border: 'border-gold-500/40 hover:border-gold-500',
    badge: 'Security',
  },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      {/* Hero Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950" />
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative z-10 text-center pt-16 pb-12 px-6">
          <div className="inline-flex items-center gap-2 bg-gold-500/10 border border-gold-500/30 text-gold-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-pulse" />
            Apartment Management System
          </div>
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-3 tracking-tight">
            Prithvi{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
              Elegance
            </span>
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto mt-4 font-light">
            A premium residential community — managed with clarity and care.
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-slate-500 text-sm">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
              5 Floors
            </span>
            <span className="w-px h-4 bg-navy-700" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>
              60 Flats
            </span>
            <span className="w-px h-4 bg-navy-700" />
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
              Secure Access
            </span>
          </div>
        </div>
        {/* Gold divider */}
        <div className="relative h-px bg-gradient-to-r from-transparent via-gold-500/50 to-transparent" />
      </header>

      {/* Role Selection */}
      <main className="flex-1 px-4 md:px-8 py-12 max-w-5xl mx-auto w-full">
        <p className="text-center text-slate-400 mb-10 text-base tracking-wide uppercase text-sm font-medium">
          Select your portal to continue
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {roles.map((role) => (
            <button
              key={role.key}
              onClick={() => navigate(`/login/${role.key}`)}
              className={`group relative card border ${role.border} p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-500/10 cursor-pointer`}
            >
              <span className="absolute top-4 right-4 text-xs font-semibold text-gold-500/70 tracking-widest uppercase">
                {role.badge}
              </span>
              <div className="text-gold-400 mb-5 group-hover:text-gold-300 transition-colors duration-200">
                {role.icon}
              </div>
              <h3 className="text-white font-serif text-2xl font-semibold mb-1.5 group-hover:text-gold-100 transition-colors">
                {role.label}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{role.description}</p>
              <div className="mt-5 flex items-center text-gold-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Login
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </main>

      <footer className="text-center text-slate-600 text-xs py-6 border-t border-navy-800">
        © {new Date().getFullYear()} Prithvi Elegance · All rights reserved
      </footer>
    </div>
  )
}
