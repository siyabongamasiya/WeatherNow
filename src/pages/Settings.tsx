import React from 'react'
import './Settings.css'
import { useTheme } from '../contexts/ThemeContext'
import { useSettings } from '../contexts/SettingsContext'

export default function Settings() {
  const { theme, setTheme } = useTheme()
  const { unit, setUnit, notifications, setNotifications } = useSettings()

  return (
    <section className="settings card">
      <h2>Settings</h2>

      <div className="setting-row">
        <div>
          <div className="label-strong">Temperature Unit</div>
          <div className="muted">Choose Celsius or Fahrenheit</div>
        </div>
        <div className="group">
          <button className={`chip ${unit === 'metric' ? 'active' : ''}`} onClick={() => setUnit('metric')}>°C</button>
          <button className={`chip ${unit === 'imperial' ? 'active' : ''}`} onClick={() => setUnit('imperial')}>°F</button>
        </div>
      </div>

      <div className="setting-row">
        <div>
          <div className="label-strong">Theme</div>
          <div className="muted">Switch between light and dark</div>
        </div>
        <div className="group">
          <button className={`chip ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>Light</button>
          <button className={`chip ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>Dark</button>
        </div>
      </div>

      <div className="setting-row">
        <div>
          <div className="label-strong">Notifications</div>
          <div className="muted">Enable severe weather alerts</div>
        </div>
        <label className="switch">
          <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
          <span className="slider" />
        </label>
      </div>
    </section>
  )
}
