import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export interface LocationInfo {
  name: string
  latitude: number
  longitude: number
}

interface LocationContextValue {
  active: LocationInfo | null
  saved: LocationInfo[]
  setActive: (loc: LocationInfo) => void
  addSaved: (loc: LocationInfo) => void
  removeSaved: (name: string) => void
}

const LocationContext = createContext<LocationContextValue | null>(null)

const STORAGE_ACTIVE = 'weathernow:active_location'
const STORAGE_SAVED = 'weathernow:saved_locations'

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [active, setActiveState] = useState<LocationInfo | null>(() => {
    const raw = localStorage.getItem(STORAGE_ACTIVE)
    return raw ? JSON.parse(raw) as LocationInfo : null
  })
  const [saved, setSaved] = useState<LocationInfo[]>(() => {
    const raw = localStorage.getItem(STORAGE_SAVED)
    return raw ? JSON.parse(raw) as LocationInfo[] : []
  })

  useEffect(() => {
    if (active) localStorage.setItem(STORAGE_ACTIVE, JSON.stringify(active))
  }, [active])

  useEffect(() => {
    localStorage.setItem(STORAGE_SAVED, JSON.stringify(saved))
  }, [saved])

  // Try to get browser geolocation on first load if no active
  useEffect(() => {
    if (active) return
    if (!('geolocation' in navigator)) return
    navigator.geolocation.getCurrentPosition((pos) => {
      const loc: LocationInfo = {
        name: 'Your Location',
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      }
      setActiveState(loc)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setActive = (loc: LocationInfo) => setActiveState(loc)
  const addSaved = (loc: LocationInfo) => setSaved((prev) => {
    if (prev.find(p => p.name === loc.name)) return prev
    return [loc, ...prev]
  })
  const removeSaved = (name: string) => setSaved(prev => prev.filter(p => p.name !== name))

  const value = useMemo(() => ({ active, saved, setActive, addSaved, removeSaved }), [active, saved])

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>
}

export const useLocationCtx = () => {
  const ctx = useContext(LocationContext)
  if (!ctx) throw new Error('useLocationCtx must be used within LocationProvider')
  return ctx
}
