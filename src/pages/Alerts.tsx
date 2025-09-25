import React from 'react'
import './Alerts.css'
import NotificationBanner from '../components/NotificationBanner'

export default function Alerts() {
  const alerts = [
    { message: 'High wind warning from 2PM - 8PM', severity: 'high' as const },
    { message: 'Heat advisory tomorrow', severity: 'medium' as const },
  ]

  return (
    <section className="alerts">
      {alerts.map((a, i) => (
        <NotificationBanner key={i} message={a.message} severity={a.severity} />
      ))}
    </section>
  )
}
