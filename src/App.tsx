import { Outlet, NavLink } from 'react-router-dom'
import Header from './components/Header'
import NotificationBanner from './components/NotificationBanner'
import './App.css'

export default function App() {
  return (
    <div>
      <Header />
      <NotificationBanner message="Severe thunderstorm warning in your area" severity="high" />
      <nav className="container app-nav card">
        <NavLink to="/" end className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/hourly" className={({isActive}) => isActive ? 'active' : ''}>Hourly</NavLink>
        <NavLink to="/daily" className={({isActive}) => isActive ? 'active' : ''}>Daily</NavLink>
        <NavLink to="/search" className={({isActive}) => isActive ? 'active' : ''}>Search & Locations</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? 'active' : ''}>Settings</NavLink>
        <NavLink to="/alerts" className={({isActive}) => isActive ? 'active' : ''}>Alerts</NavLink>
      </nav>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
