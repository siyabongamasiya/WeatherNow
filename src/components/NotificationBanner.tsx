import React from 'react'
import './NotificationBanner.css'

interface NotificationBannerProps {
  message: string
  severity?: 'low' | 'medium' | 'high'
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ message, severity = 'low' }) => {
  if (!message) return null
  return (
    <div className={`notif-banner notif-${severity}`} role="status" aria-live="polite">
      <span className="notif-dot" aria-hidden />
      <span className="notif-text">{message}</span>
    </div>
  )
}

export default NotificationBanner
