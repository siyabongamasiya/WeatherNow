# WeatherNow

A modern weather application built with React 19, Vite, and TypeScript.

## Tech Stack
- React ^19.1.1
- Vite + TypeScript
- React Router
- CSS modules (separate .css files per component/page)

## Features
- Reusable components: Header, WeatherCard, SearchBar, NotificationBanner
- Pages: Home (current weather), Hourly, Daily, Search & Locations, Settings, Alerts
- Theme switch (light/dark)
- Units: Celsius/Fahrenheit
- Responsive breakpoints: 320, 480, 768, 1024, 1200

## Getting Started
1. Install dependencies
```bash
npm install
```

2. Run dev server
```bash
npm run dev
```

3. Build for production
```bash
npm run build
npm run preview
```

## Project Structure
- `src/components/` shared UI components with their own CSS
- `src/pages/` route pages with their own CSS
- `src/contexts/` Theme and Settings contexts
- `src/utils/` mock data utilities
- `src/types/` TypeScript types

## Notes
- This app uses mock data utilities for demo. Swap `utils/mockWeather.ts` with real API integration as needed.
