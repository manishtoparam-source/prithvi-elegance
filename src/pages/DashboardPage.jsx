import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ChangePasswordModal from '../components/ChangePasswordModal'
import WatchmanPanel from '../components/panels/WatchmanPanel'
import ExpensesPanel from '../components/panels/ExpensesPanel'
import VacantFlatsPanel from '../components/panels/VacantFlatsPanel'
import PendingActionsPanel from '../components/panels/PendingActionsPanel'
import RepairContactsPanel from '../components/panels/RepairContactsPanel'

const dashboardConfig = {
  society: {
    label: { president: 'President', 'vice-president': 'Vice President', treasurer: 'Treasurer' },
    color: 'text-gold-400',
    bgAccent: 'from-gold-500/10 to-transparent',
    stats: [
      { label: 'Total Flats', value: '60', icon: '🏠' },
      { label: 'Occupied', value: '54', icon: '✅' },
      { label: 'Vacant', value: '6', icon: '🔑' },
      { label: 'Pending Dues', value: '₹1.2L', icon: '💰' },
    ],
    notices: [
      'Monthly maintenance meeting scheduled for May 10th.',
      'Water supply interruption on May 5th from 10 AM – 2 PM.',
      'New parking rules effective from June 1st.',
    ],
  },
  owner: {
    label: null,
    color: 'text-blue-300',
    bgAccent: 'from-blue-500/10 to-transparent',
    stats: [
      { label: 'Maintenance Due', value: '₹2,500', icon: '🔧' },
      { label: 'Next Due Date', value: 'May 15', icon: '📅' },
      { label: 'Complaints', value: '1 Open', icon: '📋' },
      { label: 'Visitors Today', value: '3', icon: '👥' },
    ],
    notices: [
      'Lift maintenance on May 6th. Use stairs as needed.',
      'Annual AGM on May 20th at 6 PM in the community hall.',
      'Please keep common areas clean.',
    ],
  },
  renter: {
    label: null,
    color: 'text-purple-300',
    bgAccent: 'from-purple-500/10 to-transparent',
    stats: [
      { label: 'Rent Due', value: '₹18,000', icon: '🏷️' },
      { label: 'Due Date', value: 'May 10', icon: '📅' },
      { label: 'Service Requests', value: '0 Open', icon: '🛠️' },
      { label: 'Visitors Today', value: '2', icon: '👥' },
    ],
    notices: [
      'Pest control scheduled for May 8th. Ensure access.',
      'Society rules reminder: No loud music after 10 PM.',
      'Update your emergency contact in the office.',
    ],
  },
  security: {
    label: { 'watchman-1': 'Watchman-1', 'watchman-2': 'Watchman-2' },
    color: 'text-green-400',
    bgAccent: 'from-green-500/10 to-transparent',
    stats: [
      { label: 'Visitors Today', value: '12', icon: '👤' },
      { label: 'Vehicles Logged', value: '8', icon: '🚗' },
      { label: 'Alerts', value: 'None', icon: '🚨' },
      { label: 'Shift', value: 'Day', icon: '⏰' },
    ],
    notices: [
      'VIP visitor expected at Flat 305 at 3 PM.',
      'Do not allow unverified deliveries after 8 PM.',
      'Emergency drill scheduled for May 12th at 11 AM.',
    ],
  },
}

const roleIcons = {
  society: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21" /></svg>),
  owner: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" /></svg>),
  renter: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>),
  security: (<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>),
}

const societyNavItems = [
  { key: 'overview', label: 'Overview', emoji: '🏠' },
  { key: 'watchmen', label: 'Watchmen IDs', emoji: '🛡️' },
  { key: 'expenses', label: 'Expenses', emoji: '💰' },
  { key: 'vacant', label: 'Vacant Flats', emoji: '🔑' },
  { key: 'actions', label: 'Pending Actions', emoji: '📋' },
  { key: 'repairs', label: 'Repair Contacts', emoji: '🔧' },
]

function NoticeBoard({ notices }) {
  return (
    <div className="lg:col-span-2 card border border-navy-700 p-6">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
        <h3 className="text-white font-semibold">Notice Board</h3>
      </div>
      <ul className="space-y-3">
        {notices.map((notice, i) => (
          <li key={i} className="flex items-start gap-3 p-3 bg-navy-800 rounded-lg border border-navy-700">
            <span className="w-2 h-2 bg-gold-500 rounded-full mt-1.5 shrink-0" />
            <p className="text-slate-300 text-sm leading-relaxed">{notice}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function QuickActions({ onChangePassword }) {
  return (
    <div className="card border border-navy-700 p-6">
      <div className="flex items-center gap-2 mb-5">
        <svg className="w-5 h-5 text-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
        <h3 className="text-white font-semibold">Quick Actions</h3>
      </div>
      <div className="space-y-2">
        <button onClick={onChangePassword} className="w-full flex items-center gap-3 p-3 bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-gold-500/40 rounded-lg text-left transition-all group">
          <div className="w-8 h-8 bg-gold-500/10 rounded-lg flex items-center justify-center text-gold-400 group-hover:bg-gold-500/20 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" /></svg>
          </div>
          <div><p className="text-white text-sm font-medium">Change Password</p><p className="text-slate-500 text-xs">Update your credentials</p></div>
        </button>
        <button className="w-full flex items-center gap-3 p-3 bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-navy-500 rounded-lg text-left transition-all group">
          <div className="w-8 h-8 bg-navy-700 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-navy-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
          </div>
          <div><p className="text-white text-sm font-medium">Notifications</p><p className="text-slate-500 text-xs">View all alerts</p></div>
        </button>
        <button className="w-full flex items-center gap-3 p-3 bg-navy-800 hover:bg-navy-700 border border-navy-700 hover:border-navy-500 rounded-lg text-left transition-all group">
          <div className="w-8 h-8 bg-navy-700 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-navy-600 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
          </div>
          <div><p className="text-white text-sm font-medium">Complaints</p><p className="text-slate-500 text-xs">Submit an issue</p></div>
        </button>
      </div>
    </div>
  )
}

function WelcomeBanner({ displayName, config, timeStr, dateStr }) {
  return (
    <div className={`card border border-navy-700 p-6 md:p-8 bg-gradient-to-br ${config.bgAccent} relative overflow-hidden`}>
      <div className="absolute inset-0 opacity-5" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-9.5zm-2 4.8V22h2v5h-4v-2.2h2zM10 13H0v5h10v-5zm10 0h-3v3h3v-3zm10 10h-3v3h3v-3zm0-10h-3v3h3v-3z'/%3E%3C/g%3E%3C/svg%3E")`}} />
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <p className="text-slate-400 text-sm mb-1">Welcome back,</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">{displayName}</h2>
          <p className={`mt-1 text-sm font-medium ${config.color}`}>Society Management Portal</p>
        </div>
        <div className="text-right shrink-0">
          <p className="text-white font-semibold text-lg">{timeStr}</p>
          <p className="text-slate-400 text-xs mt-0.5">{dateStr}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Active Session
          </div>
        </div>
      </div>
    </div>
  )
}

function SocietyLayout({ config, displayName, onChangePassword }) {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  const renderPanel = () => {
    switch (activeTab) {
      case 'watchmen': return <WatchmanPanel />
      case 'expenses': return <ExpensesPanel />
      case 'vacant': return <VacantFlatsPanel />
      case 'actions': return <PendingActionsPanel />
      case 'repairs': return <RepairContactsPanel />
      default:
        return (
          <div className="space-y-8">
            <WelcomeBanner displayName={displayName} config={config} timeStr={timeStr} dateStr={dateStr} />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {config.stats.map((stat, i) => (
                <div key={i} className="card border border-navy-700 p-5 hover:border-gold-500/30 transition-colors">
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                  <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <NoticeBoard notices={config.notices} />
              <QuickActions onChangePassword={onChangePassword} />
            </div>
          </div>
        )
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-16 h-[calc(100vh-64px)] w-60 bg-navy-900 border-r border-navy-700 flex flex-col z-40 transition-transform duration-300 overflow-y-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-4 border-b border-navy-700">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-0.5">Society Panel</p>
          <p className="text-gold-400 text-sm font-medium">{displayName}</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {societyNavItems.map(item => (
            <button
              key={item.key}
              onClick={() => { setActiveTab(item.key); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left ${
                activeTab === item.key
                  ? 'bg-gold-500/15 text-gold-400 border border-gold-500/25'
                  : 'text-slate-400 hover:text-white hover:bg-navy-800 border border-transparent'
              }`}
            >
              <span className="text-base">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-navy-700">
          <button
            onClick={onChangePassword}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-gold-400 hover:bg-navy-800 transition-all border border-transparent"
          >
            <span className="text-base">🔐</span>
            Change Password
          </button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Mobile toggle */}
        <div className="lg:hidden px-4 pt-4 pb-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 border border-navy-600 px-3 py-2 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" /></svg>
            {societyNavItems.find(i => i.key === activeTab)?.label || 'Menu'}
          </button>
        </div>
        <main className="p-4 md:p-6 lg:p-8">
          {renderPanel()}
        </main>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const { role } = useParams()
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()
  const [showChangePassword, setShowChangePassword] = useState(false)

  if (!currentUser || currentUser.role !== role) {
    navigate(`/login/${role}`)
    return null
  }

  const config = dashboardConfig[role]
  if (!config) {
    navigate('/')
    return null
  }

  const displayName = config.label
    ? config.label[currentUser.identifier] || currentUser.identifier
    : `Flat ${currentUser.identifier}`

  const handleLogout = () => { logout(); navigate('/') }

  const now = new Date()
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Top Nav */}
      <nav className="bg-navy-900 border-b border-navy-700 sticky top-0 z-40">
        <div className="px-4 md:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-xl font-semibold text-white">Prithvi <span className="text-gold-400">Elegance</span></span>
            <span className="hidden sm:block h-4 w-px bg-navy-600" />
            <span className={`hidden sm:flex items-center gap-1.5 text-sm font-medium ${config.color}`}>
              {roleIcons[role]}{displayName}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setShowChangePassword(true)} className="flex items-center gap-2 text-sm text-slate-400 hover:text-gold-400 transition-colors border border-navy-600 hover:border-gold-500/50 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span className="hidden sm:inline">Settings</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors border border-navy-600 hover:border-red-500/50 px-3 py-1.5 rounded-lg">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></svg>
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Role-based content */}
      {role === 'society' ? (
        <SocietyLayout config={config} displayName={displayName} onChangePassword={() => setShowChangePassword(true)} />
      ) : (
        <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
          <div className={`card border border-navy-700 p-6 md:p-8 bg-gradient-to-br ${config.bgAccent} relative overflow-hidden`}>
            <div className="absolute inset-0 opacity-5" style={{backgroundImage:`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-9.5zm-2 4.8V22h2v5h-4v-2.2h2zM10 13H0v5h10v-5zm10 0h-3v3h3v-3zm10 10h-3v3h3v-3zm0-10h-3v3h3v-3z'/%3E%3C/g%3E%3C/svg%3E")`}} />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Welcome back,</p>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">{displayName}</h2>
                <p className={`mt-1 text-sm font-medium capitalize ${config.color}`}>{role.charAt(0).toUpperCase() + role.slice(1)} Portal</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-white font-semibold text-lg">{timeStr}</p>
                <p className="text-slate-400 text-xs mt-0.5">{dateStr}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 bg-green-500/10 border border-green-500/30 text-green-400 text-xs px-3 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />Active Session
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {config.stats.map((stat, i) => (
              <div key={i} className="card border border-navy-700 p-5 hover:border-gold-500/30 transition-colors">
                <div className="text-2xl mb-3">{stat.icon}</div>
                <p className="text-2xl font-bold text-white font-serif">{stat.value}</p>
                <p className="text-slate-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <NoticeBoard notices={config.notices} />
            <QuickActions onChangePassword={() => setShowChangePassword(true)} />
          </div>
        </main>
      )}

      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
    </div>
  )
}
