import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {Database, remove, ref, onValue, getDatabase, DataSnapshot} from 'firebase/database';
import { ForecastService } from 'src/app/services/forecast.service';
import { RegisterService } from '../services/register.service';
import { apiConfig } from 'src/app/config';
import { WeatherService } from 'src/app/services/weather.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  measureOfTemp: string = '';
  unitSystem: string = '';

  WeatherData: any;
  currentTime!: number;
  sunriseTime!: number;
  sunsetTime!: number;
  icon!: string;

  cityName: string = 'Cluj';
  isLoggedIn!: any;
  nameToShow!: string;
  isAdded!: boolean;

  favoritesRef!: AngularFireList<object>;
  user!: any;
  dataFromFavorites!: object;
  favoriteCity: Array<string> = [];
  key!: any;
  // favoriteCity: Object;

  constructor(
    private auth: RegisterService,
    public firedb: AngularFireDatabase,
    private router: Router,
    private weatherService: WeatherService
  ) {
    this.isLoggedIn = localStorage.getItem('user');

    this.user = this.auth.getUserLoggedIn();
    const db = getDatabase();
    const starRef = ref(db, 'favorites/' + this.user);

    onValue(starRef, snapshot => {
      this.dataFromFavorites = snapshot.val();
      console.log(this.dataFromFavorites);
      Object.values(this.dataFromFavorites).map((data: string) => {
        this.favoriteCity.push(data);
      });
      this.isAdded = this.favoriteCity.includes(this.nameToShow);
      console.log(this.favoriteCity);
    });
  }

  ngOnInit(): void {
    this.unitSystem = this.weatherService.getUnitSystem();
    const measurementUnits =
      this.unitSystem === 'metric'
        ? apiConfig.measurementUnits.metric
        : apiConfig.measurementUnits.imperial;

    this.measureOfTemp = measurementUnits.temperature;
    this.getWeatherData('Cluj');
  }

  changeUnit(unitSystem: string) {
    this.weatherService.updateUnitSystem(unitSystem);
  }

  getWeatherData(cityName: any) {
    this.nameToShow = cityName;
    this.isAdded = this.favoriteCity.includes(this.nameToShow);
    fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        cityName +
        '&appid=5fe302f14d5bd84b4b60562300f00762'
    )
      .then(response => response.json())
      .then(data => this.setWeatherData(data));
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    this.sunriseTime = new Date(data.sys.sunrise * 1000).getHours();
    this.sunsetTime = new Date(data.sys.sunset * 1000).getHours();
    this.currentTime = new Date().getHours();

    if (this.unitSystem === 'metric') {
      this.WeatherData.currentTemperature = (data.main.temp - 273.15).toFixed(
        0
      );
      this.WeatherData.minTemperature = (data.main.temp_min - 273.15).toFixed(
        0
      );
      this.WeatherData.maxTemperature = (data.main.temp_max - 273.15).toFixed(
        0
      );
      this.WeatherData.humidity = data.main.humidity;
      this.WeatherData.wind = data.wind.speed;
    } else {
      this.WeatherData.currentTemperature = (
        (data.main.temp - 273.15) * (9 / 5) +
        32
      ).toFixed(0);
      this.WeatherData.minTemperature = (
        (data.main.temp_max - 273.15) * (9 / 5) +
        32
      ).toFixed(0);
      this.WeatherData.maxTemperature = (
        (data.main.temp_min - 273.15) * (9 / 5) +
        32
      ).toFixed(0);
      this.WeatherData.humidity = data.main.humidity;
      this.WeatherData.wind = data.wind.speed;
    }

    console.log(this.WeatherData);
  }

  onLoadCityList() {
    this.router.navigate(['/city-list']);
  }

  addFavorite() {
    this.auth.createFavorite(this.cityName);
  }

  removeFavorite() {
    const db = getDatabase();
    console.log('cityName' + this.cityName);
    console.log(this.dataFromFavorites);
    this.key = Object.keys(this.dataFromFavorites).find(
      key => (this.dataFromFavorites as any)[key] === this.cityName
    );
    remove(ref(db, 'favorites/' + this.user + '/' + this.key));
    console.log(ref(db, '/favorites' + this.user + '/"' + this.key + '"'));
  }
}
