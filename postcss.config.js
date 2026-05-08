import { createContext, useContext, useState } from 'react'

const DEFAULT_PASSWORD = 'admin@1234'

// Generate all flat numbers: 5 floors x 12 flats
const generateFlats = () => {
  const flats = {}
  for (let floor = 1; floor <= 5; floor++) {
    for (let unit = 1; unit <= 12; unit++) {
      const flatNo = `${floor}${String(unit).padStart(2, '0')}`
      flats[flatNo] = { owner: DEFAULT_PASSWORD, renter: DEFAULT_PASSWORD }
    }
  }
  return flats
}

const initialState = {
  society: {
    president: DEFAULT_PASSWORD,
    'vice-president': DEFAULT_PASSWORD,
    treasurer: DEFAULT_PASSWORD,
  },
  flats: generateFlats(),
  security: {
    'watchman-1': DEFAULT_PASSWORD,
    'watchman-2': DEFAULT_PASSWORD,
  },
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [passwords, setPasswords] = useState(initialState)
  const [currentUser, setCurrentUser] = useState(null)

  const login = (role, identifier, password) => {
    let storedPassword = null

    if (role === 'society') {
      storedPassword = passwords.society[identifier]
    } else if (role === 'owner') {
      storedPassword = passwords.flats[identifier]?.owner
    } else if (role === 'renter') {
      storedPassword = passwords.flats[identifier]?.renter
    } else if (role === 'security') {
      storedPassword = passwords.security[identifier]
    }

    if (storedPassword && storedPassword === password) {
      setCurrentUser({ role, identifier })
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials. Please try again.' }
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const changePassword = (currentPassword, newPassword) => {
    if (!currentUser) return { success: false, error: 'Not logged in.' }

    const { role, identifier } = currentUser
    let storedPassword = null

    if (role === 'society') {
      storedPassword = passwords.society[identifier]
    } else if (role === 'owner') {
      storedPassword = passwords.flats[identifier]?.owner
    } else if (role === 'renter') {
      storedPassword = passwords.flats[identifier]?.renter
    } else if (role === 'security') {
      storedPassword = passwords.security[identifier]
    }

    if (storedPassword !== currentPassword) {
      return { success: false, error: 'Current password is incorrect.' }
    }

    if (newPassword.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' }
    }

    setPasswords(prev => {
      const updated = { ...prev }
      if (role === 'society') {
        updated.society = { ...prev.society, [identifier]: newPassword }
      } else if (role === 'owner') {
        updated.flats = {
          ...prev.flats,
          [identifier]: { ...prev.flats[identifier], owner: newPassword },
        }
      } else if (role === 'renter') {
        updated.flats = {
          ...prev.flats,
          [identifier]: { ...prev.flats[identifier], renter: newPassword },
        }
      } else if (role === 'security') {
        updated.security = { ...prev.security, [identifier]: newPassword }
      }
      return updated
    })

    return { success: true }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, changePassword }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
