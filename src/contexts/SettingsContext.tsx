import React, { createContext, useContext, useMemo, useState } from 'react'

export type Unit = 'metric' | 'imperial'

interface Settings {
  unit: Unit
  notifications: boolean
}

interface SettingsContextValue extends Settings {
  setUnit: (u: Unit) => void
  setNotifications: (v: boolean) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnitState] = useState<Unit>(() => (localStorage.getItem('weathernow:unit') as Unit) || 'metric')
  const [notifications, setNotificationsState] = useState<boolean>(() => localStorage.getItem('weathernow:notifications') === 'true')

  const setUnit = (u: Unit) => {
    setUnitState(u)
    localStorage.setItem('weathernow:unit', u)
  }
  const setNotifications = (v: boolean) => {
    setNotificationsState(v)
    localStorage.setItem('weathernow:notifications', String(v))
  }

  const value = useMemo(() => ({ unit, notifications, setUnit, setNotifications }), [unit, notifications])

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export const useSettings = () => {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider')
  return ctx
}
