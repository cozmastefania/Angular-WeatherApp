import { Component, OnInit } from '@angular/core';
import {RegisterService} from '../services/register.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  WeatherData: any;
  currentTime!: number;
  sunriseTime!: number;
  sunsetTime!: number;
  cityName: string = 'Cluj';
  nameToShow!:string;

  constructor(private auth:RegisterService) { }

  ngOnInit(): void {
    this.getWeatherData('Cluj');
  }

  getWeatherData (cityName: any) {
    this.nameToShow = cityName;
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=5fe302f14d5bd84b4b60562300f00762')
    .then(response => response.json())
    .then(data => this.setWeatherData(data));
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    this.sunriseTime = new Date(data.sys.sunrise * 1000).getHours();
    this.sunsetTime = new Date(data.sys.sunset * 1000).getHours();
    this.currentTime = new Date().getHours();
    this.WeatherData.currentTemperature = (data.main.temp - 273.15).toFixed(0);
    this.WeatherData.minTemperature = (data.main.temp_min - 273.15).toFixed(0);
    this.WeatherData.maxTemperature = (data.main.temp_max - 273.15).toFixed(0);
    this.WeatherData.humidity = data.main.humidity;
    this.WeatherData.wind = data.wind.speed;
    console.log(this.WeatherData);
  }

  logOut() {
    this.auth.logoutUser();
  }

  // logIn() {
  //   if (localStorage.getItem('token')) {
  //     this.auth.logoutUser();
    
  // }

}
