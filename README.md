# WeatherNow

WeatherNow is a React + TypeScript + Vite application that provides real-time weather information, hourly and daily forecasts, severe weather alerts, and customizable settings. It is designed to be fast, responsive, and user-friendly.

---

## Features

- **Real-time Weather Info**
  - Current temperature, humidity, wind speed
  - Hourly and daily forecasts
- **Location-Based Forecasting**
  - Detects user’s location (with permission)
  - Search and view weather for different locations
- **Weather Alerts**
  - Displays severe weather notifications
- **Multiple Locations**
  - Save and switch between multiple locations
- **Customization**
  - Toggle between Celsius and Fahrenheit
  - Switch between light/dark theme
- **Responsive UI**
  - Optimized for mobile, tablet, and desktop breakpoints

---

## Tech Stack

- **React** ^19.1.1
- **React Router DOM** ^6.26.2
- **Vite** ^5.4.8
- **TypeScript** ^5.6.3
- **CSS** for styling

---

## Project Structure

```
weathernow/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components (Header, NotificationBanner, etc.)
│   ├── pages/            # Route pages (Home, Hourly, Daily, Search, Settings, Alerts)
│   ├── App.tsx           # Root component with layout & navigation
│   ├── App.css           # Global styles
│   ├── main.tsx          # Entry point
│   └── router.tsx        # Routing configuration
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/siyabongamasiya/WeatherNow.git
cd weathernow
npm install
```

---

## Running the App

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Usage

- Navigate using the top nav bar (Home, Hourly, Daily, Search & Locations, Settings, Alerts).
- Search for a city or allow location permission to get weather automatically.
- Switch units (°C/°F) and themes from Settings.
- View severe weather alerts in the Notification Banner and Alerts page.

---

## Responsiveness

The app is optimized for common breakpoints:
- 320px
- 480px
- 768px
- 1024px
- 1200px+

---


