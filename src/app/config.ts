export const appConfig = {
  defaultUnit: 'metric',
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
    forecast: 300000, 
  }
};