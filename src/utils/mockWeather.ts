import { Unit } from '../contexts/SettingsContext'

export function mockHourly(unit: Unit) {
  const base = [
    { time: '09:00', temp: 18, condition: 'Sunny', icon: '☀️' },
    { time: '10:00', temp: 20, condition: 'Sunny', icon: '☀️' },
    { time: '11:00', temp: 22, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '12:00', temp: 23, condition: 'Partly Cloudy', icon: '⛅' },
    { time: '13:00', temp: 24, condition: 'Cloudy', icon: '☁️' },
    { time: '14:00', temp: 24, condition: 'Cloudy', icon: '☁️' },
    { time: '15:00', temp: 23, condition: 'Windy', icon: '🌬️' },
    { time: '16:00', temp: 22, condition: 'Windy', icon: '🌬️' },
  ]
  return base.map(h => ({ ...h, temp: unit === 'metric' ? h.temp : Math.round(h.temp * 9/5 + 32) }))
}

export function mockDaily(unit: Unit) {
  const base = [
    { day: 'Mon', min: 14, max: 22, condition: 'Sunny', icon: '☀️' },
    { day: 'Tue', min: 13, max: 21, condition: 'Partly Cloudy', icon: '⛅' },
    { day: 'Wed', min: 12, max: 20, condition: 'Cloudy', icon: '☁️' },
    { day: 'Thu', min: 11, max: 19, condition: 'Rain', icon: '🌧️' },
    { day: 'Fri', min: 13, max: 21, condition: 'Sunny', icon: '☀️' },
    { day: 'Sat', min: 15, max: 24, condition: 'Sunny', icon: '☀️' },
    { day: 'Sun', min: 14, max: 23, condition: 'Windy', icon: '🌬️' },
  ]
  return base.map(d => ({
    ...d,
    min: unit === 'metric' ? d.min : Math.round(d.min * 9/5 + 32),
    max: unit === 'metric' ? d.max : Math.round(d.max * 9/5 + 32)
  }))
}
