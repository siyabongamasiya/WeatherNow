import { createBrowserRouter, Outlet, Link } from 'react-router-dom'
import App from './App'
import Home from './pages/Home'
import Hourly from './pages/Hourly'
import Daily from './pages/Daily'
import SearchLocations from './pages/SearchLocations'
import Settings from './pages/Settings'
import Alerts from './pages/Alerts'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'hourly', element: <Hourly /> },
      { path: 'daily', element: <Daily /> },
      { path: 'search', element: <SearchLocations /> },
      { path: 'settings', element: <Settings /> },
      { path: 'alerts', element: <Alerts /> },
      { path: '*', element: <div className='container'><h2>Page not found</h2><Link to='/'>Go Home</Link></div> }
    ]
  }
])
