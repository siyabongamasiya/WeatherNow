// Open-Meteo API integration (no API key required)
// Docs: https://open-meteo.com/

import { Unit } from '../contexts/SettingsContext'

export interface GeoResult {
  name: string
  country: string
  latitude: number
  longitude: number
}

export async function geocodeCity(query: string): Promise<GeoResult | null> {
  const url = new URL('https://geocoding-api.open-meteo.com/v1/search')
  url.searchParams.set('name', query)
  url.searchParams.set('count', '1')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to geocode location')
  const data = await res.json()
  if (!data.results || data.results.length === 0) return null
  const r = data.results[0]
  return {
    name: r.name,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }
}

export interface CurrentWeather {
  temperature: number
  windspeed: number
  winddirection: number
  weathercode: number
  humidity: number | null
}

export interface HourlyWeatherItem {
  time: string
  temperature: number
  weathercode: number
}

export interface DailyWeatherItem {
  date: string
  tempMin: number
  tempMax: number
  weathercode: number
}

export interface WeatherBundle {
  current: CurrentWeather
  hourly: HourlyWeatherItem[]
  daily: DailyWeatherItem[]
}

function mapWmoToIcon(code: number): { icon: string; condition: string } {
  // Simplified WMO weather codes mapping to emoji
  if ([0].includes(code)) return { icon: '☀️', condition: 'Clear' }
  if ([1, 2].includes(code)) return { icon: '⛅', condition: 'Partly Cloudy' }
  if ([3].includes(code)) return { icon: '☁️', condition: 'Cloudy' }
  if ([45, 48].includes(code)) return { icon: '🌫️', condition: 'Fog' }
  if ([51, 53, 55, 56, 57, 61, 63, 65].includes(code)) return { icon: '🌧️', condition: 'Rain' }
  if ([66, 67, 71, 73, 75, 77, 85, 86].includes(code)) return { icon: '🌨️', condition: 'Snow' }
  if ([95, 96, 99].includes(code)) return { icon: '⛈️', condition: 'Thunderstorm' }
  return { icon: '❓', condition: 'Unknown' }
}

export function iconFor(code: number) {
  return mapWmoToIcon(code)
}

export async function fetchWeather(lat: number, lon: number, unit: Unit): Promise<WeatherBundle> {
  const url = new URL('https://api.open-meteo.com/v1/forecast')
  url.searchParams.set('latitude', String(lat))
  url.searchParams.set('longitude', String(lon))
  url.searchParams.set('current', 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m')
  url.searchParams.set('hourly', 'temperature_2m,weather_code')
  url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weather_code')
  url.searchParams.set('timezone', 'auto')
  url.searchParams.set('temperature_unit', unit === 'metric' ? 'celsius' : 'fahrenheit')
  url.searchParams.set('wind_speed_unit', unit === 'metric' ? 'kmh' : 'mph')

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch weather')
  const data = await res.json()

  const current: CurrentWeather = {
    temperature: data.current?.temperature_2m,
    windspeed: data.current?.wind_speed_10m,
    winddirection: data.current?.wind_direction_10m,
    weathercode: data.current?.weather_code,
    humidity: data.current?.relative_humidity_2m ?? null,
  }

  const hourly: HourlyWeatherItem[] = (data.hourly?.time || []).map((t: string, idx: number) => ({
    time: t,
    temperature: data.hourly.temperature_2m[idx],
    weathercode: data.hourly.weather_code[idx],
  }))

  const daily: DailyWeatherItem[] = (data.daily?.time || []).map((d: string, idx: number) => ({
    date: d,
    tempMin: data.daily.temperature_2m_min[idx],
    tempMax: data.daily.temperature_2m_max[idx],
    weathercode: data.daily.weather_code[idx],
  }))

  return { current, hourly, daily }
}

export function formatHourLabel(iso: string) {
  const date = new Date(iso)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export function formatWeekday(isoDate: string) {
  const date = new Date(isoDate)
  return date.toLocaleDateString([], { weekday: 'short' })
}
