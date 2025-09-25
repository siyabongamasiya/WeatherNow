import React from 'react'
import './Header.css'
import { useTheme } from '../contexts/ThemeContext'
import { useLocationCtx } from '../contexts/LocationContext'

const Header: React.FC = () => {
  const { theme, toggle } = useTheme()
  const { active } = useLocationCtx()

  return (
    <header className="header card">
      <div className="header-left">
        <div className="brand">
          <span className="logo" aria-hidden>⛅</span>
          <h1>WeatherNow</h1>
        </div>
        <div className="location" title="Active location">{active?.name || 'Select a location'}</div>
      </div>
      <div className="header-actions">
        <button className="btn hoverable" onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </header>
  )
}

export default Header
