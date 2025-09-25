import React, { useState } from 'react'
import './SearchLocations.css'
import SearchBar from '../components/SearchBar'
import { geocodeCity } from '../services/openMeteo'
import { useLocationCtx } from '../contexts/LocationContext'

export default function SearchLocations() {
  const { saved, addSaved, removeSaved, setActive } = useLocationCtx()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSearch = (q: string) => {
    if (!q) return
    setError(null)
    setLoading(true)
    geocodeCity(q)
      .then((res) => {
        if (!res) {
          setError('No results found')
          return
        }
        const loc = { name: `${res.name}, ${res.country}`.trim(), latitude: res.latitude, longitude: res.longitude }
        addSaved(loc)
        setActive(loc)
      })
      .catch((e) => setError(e?.message || 'Failed to search location'))
      .finally(() => setLoading(false))
  }

  const remove = (name: string) => removeSaved(name)

  return (
    <section className="search-locs">
      <SearchBar onSearch={onSearch} />
      <div className="saved card">
        <h3>Saved Locations</h3>
        {loading && <p>Searching…</p>}
        {error && <p className="muted">{error}</p>}
        <ul>
          {saved.map(loc => (
            <li key={loc.name}>
              <span className="hoverable" onClick={() => setActive(loc)} title="Set as active">{loc.name}</span>
              <button className="remove hoverable" onClick={() => remove(loc.name)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
