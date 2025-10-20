import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { ThemeProvider } from './contexts/ThemeContext'
import { SettingsProvider } from './contexts/SettingsContext'
import { LocationProvider } from './contexts/LocationContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SettingsProvider>
        <LocationProvider>
          <RouterProvider router={router} /> 
        </LocationProvider>
      </SettingsProvider>
    </ThemeProvider>
  </React.StrictMode>
)
