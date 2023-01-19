export const appConfig = {
  defaultUnit: 'metric',
  defaultCity: {
    coord: {
      latitude: 51.509865,
      longitude: -0.118092
    }
  }
};

export const apiConfig = {
  host: 'https://api.openweathermap.org/data/2.5',
  appId: '5fe302f14d5bd84b4b60562300f00762',
  measurementUnits: {
    metric: {
      temperature: 'C',
      windSpeed: 'm/s',
      pressure: 'mmHg'
    },
    imperial: {
      temperature: 'F',
      windSpeed: 'mil/h',
      pressure: 'hPa'
    }
  },
  updateInterval: {
    forecast: 300000, // 5 minute
    weather: 300000 // 5 minute
  }
};