export interface HourlyForecast {
  time: string
  temp: number
  condition: string
  icon: string
}

export interface DailyForecast {
  day: string
  min: number
  max: number
  condition: string
  icon: string
}
