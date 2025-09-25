import React from 'react'
import './Home.css'
import { useWeather } from '../hooks/useWeather'
import { iconFor } from '../services/openMeteo'

export default function Home() {
  const { data, loading, error, unit, location } = useWeather()

  if (!location) {
    return (
      <section className="home-grid">
        <div className="current card">
          <h2>Select a location</h2>
          <p>Go to Search & Locations to pick a city.</p>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="home-grid">
        <div className="current card">
          <h2>Loading current weather…</h2>
        </div>
      </section>
    )
  }

  if (error || !data) {
    return (
      <section className="home-grid">
        <div className="current card">
          <h2>Unable to load weather</h2>
          <p className="label">{error || 'Try again later.'}</p>
        </div>
      </section>
    )
  }

  const unitSpeed = unit === 'metric' ? 'km/h' : 'mph'
  const c = data.current
  const { icon, condition } = iconFor(c.weathercode)

  return (
    <section className="home-grid">
      <div className="current card">
        <h2>Current Weather</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontSize: 28 }} aria-hidden>{icon}</div>
          <div className="label">{condition}</div>
        </div>
        <div className="current-grid">
          <div>
            <div className="metric">{Math.round(c.temperature)}{unit === 'metric' ? '°C' : '°F'}</div>
            <div className="label">Temperature</div>
          </div>
          <div>
            <div className="metric">{c.humidity ?? '—'}%</div>
            <div className="label">Humidity</div>
          </div>
          <div>
            <div className="metric">{Math.round(c.windspeed)} {unitSpeed}</div>
            <div className="label">Wind Speed</div>
          </div>
          <div>
            <div className="metric loc">{location.name}</div>
            <div className="label">Location</div>
          </div>
        </div>
      </div>
    </section>
  )
}
