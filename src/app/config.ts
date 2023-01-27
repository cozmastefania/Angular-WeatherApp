import { createApi } from 'unsplash-js';

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
      pressure: 'mmHg',
    },
    imperial: {
      temperature: 'F',
      windSpeed: 'mil/h',
      pressure: 'hPa',
    },
  },
  updateInterval: {
    forecast: 300000,
  },
};

export const unsplash = {
  apiURL: 'https://api.unsplash.com/search/photos/',
  accessKey: 'XFSiu0zUTnB00v4b2qi_K-BELp25FESEN5XxnJ3HBzo',
};
