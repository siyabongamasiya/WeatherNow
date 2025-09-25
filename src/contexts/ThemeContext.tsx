import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  toggle: () => void
  setTheme: (t: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem('weathernow:theme') as Theme | null
    return stored ?? 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('weathernow:theme', theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    toggle: () => setThemeState(prev => prev === 'light' ? 'dark' : 'light'),
    setTheme: (t: Theme) => setThemeState(t)
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
