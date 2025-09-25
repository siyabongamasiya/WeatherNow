import React from 'react'
import './Hourly.css'
import WeatherCard from '../components/WeatherCard'
import { useWeather } from '../hooks/useWeather'
import { formatHourLabel, iconFor } from '../services/openMeteo'

export default function Hourly() {
  const { data, loading, error, unit, location } = useWeather()

  if (!location) return <section><h2>Hourly Forecast</h2><p className="label">Select a location first.</p></section>
  if (loading) return <section><h2>Hourly Forecast</h2><p>Loading…</p></section>
  if (error || !data) return <section><h2>Hourly Forecast</h2><p className="label">{error || 'Unable to load data'}</p></section>

  const nextHours = data.hourly.slice(0, 12)

  return (
    <section>
      <h2>Hourly Forecast</h2>
      <div className="hourly-scroll">
        {nextHours.map(h => {
          const { icon, condition } = iconFor(h.weathercode)
          return (
            <WeatherCard
              key={h.time}
              temp={h.temperature}
              condition={condition}
              icon={icon}
              timeOrDay={formatHourLabel(h.time)}
              unit={unit}
            />
          )
        })}
      </div>
    </section>
  )
}
