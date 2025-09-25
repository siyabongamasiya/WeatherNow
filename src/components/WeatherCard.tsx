import React from 'react'
import './WeatherCard.css'
import { Unit } from '../contexts/SettingsContext'

interface WeatherCardProps {
  temp: number
  condition: string
  icon: string
  timeOrDay: string
  unit?: Unit
}

const WeatherCard: React.FC<WeatherCardProps> = ({ temp, condition, icon, timeOrDay, unit = 'metric' }) => {
  const displayTemp = unit === 'metric' ? `${Math.round(temp)}°C` : `${Math.round(temp)}°F`
  return (
    <div className="weather-card card hoverable" role="group" aria-label={`Forecast for ${timeOrDay}`}>
      <div className="wc-top">
        <div className="wc-time">{timeOrDay}</div>
        <div className="wc-icon" aria-hidden>{icon}</div>
      </div>
      <div className="wc-bottom">
        <div className="wc-temp">{displayTemp}</div>
        <div className="wc-cond">{condition}</div>
      </div>
    </div>
  )
}

export default WeatherCard
