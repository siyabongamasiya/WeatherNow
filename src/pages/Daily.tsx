import React from 'react'
import './Daily.css'
import { useWeather } from '../hooks/useWeather'
import { formatWeekday, iconFor } from '../services/openMeteo'

export default function Daily() {
  const { data, loading, error, location } = useWeather()

  if (!location) return <section><h2>7-Day Forecast</h2><p className="label">Select a location first.</p></section>
  if (loading) return <section><h2>7-Day Forecast</h2><p>Loading…</p></section>
  if (error || !data) return <section><h2>7-Day Forecast</h2><p className="label">{error || 'Unable to load data'}</p></section>

  return (
    <section>
      <h2>7-Day Forecast</h2>
      <ul className="daily-list card">
        {data.daily.map(d => {
          const { icon, condition } = iconFor(d.weathercode)
          return (
            <li key={d.date} className="daily-item">
              <span className="d-day">{formatWeekday(d.date)}</span>
              <span className="d-icon" aria-hidden>{icon}</span>
              <span className="d-cond">{condition}</span>
              <span className="d-temp">{Math.round(d.tempMin)}° / {Math.round(d.tempMax)}°</span>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
