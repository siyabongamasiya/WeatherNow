import { useEffect, useMemo, useState } from 'react'
import { fetchWeather, WeatherBundle } from '../services/openMeteo'
import { useSettings } from '../contexts/SettingsContext'
import { useLocationCtx } from '../contexts/LocationContext'

interface State {
  data: WeatherBundle | null
  loading: boolean
  error: string | null
}

export function useWeather() {
  const { unit } = useSettings()
  const { active } = useLocationCtx()
  const [state, setState] = useState<State>({ data: null, loading: false, error: null })

  useEffect(() => {
    let cancelled = false
    async function run() {
      if (!active) return
      setState(prev => ({ ...prev, loading: true, error: null }))
      try {
        const data = await fetchWeather(active.latitude, active.longitude, unit)
        if (!cancelled) setState({ data, loading: false, error: null })
      } catch (e: any) {
        if (!cancelled) setState({ data: null, loading: false, error: e?.message || 'Failed to load weather' })
      }
    }
    run()
    return () => { cancelled = true }
  }, [active?.latitude, active?.longitude, unit])

  return useMemo(() => ({ ...state, unit, location: active }), [state, unit, active])
}
