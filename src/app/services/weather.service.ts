import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  
  
  weather: any;
  constructor(private http: HttpClient) { }

  // getWeatherData (cityName: string) {
  //   fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=5fe302f14d5bd84b4b60562300f00762')
  //   .then(response => response.json())
  //   .then(data => this.setWeatherData(data));
  // }
  
  // setWeatherData(data: any) {
  //   this.WeatherData = data;
  //   this.WeatherData.sunriseTime = new Date(data.sys.sunrise * 1000).getHours();
  //   this.WeatherData.sunsetTime = new Date(data.sys.sunset * 1000).getHours();
  //   this.WeatherData.currentTime = new Date().getHours();
  //   this.WeatherData.currentTemperature = (data.main.temp - 273.15).toFixed(0);
  //   this.WeatherData.minTemperature = (data.main.temp_min - 273.15).toFixed(0);
  //   this.WeatherData.maxTemperature = (data.main.temp_max - 273.15).toFixed(0);
  //   this.WeatherData.humidity = data.main.humidity;
  //   this.WeatherData.wind = data.wind.speed;
  //   console.log(this.WeatherData);
  // }

}
