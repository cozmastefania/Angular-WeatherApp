import { Component, OnInit } from '@angular/core';
import { getDatabase, onValue, ref, remove } from 'firebase/database';
import { apiConfig } from 'src/app/config';
import { UnsplashService } from 'src/app/services/unsplash.service';
import { WeatherService } from 'src/app/services/weather.service';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  measureOfTemp: string = '';
  unitSystem: string = '';

  WeatherData: any;
  icon: string;
  description: string;
  photoUrl: string;
  cityImage: any;

  cityName: string;
  isLoggedIn: any;
  nameToShow: string;
  isAdded: boolean;

  user: any;
  dataFromFavorites: object;
  favoriteCity: Array<string> = [];
  key: any;

  constructor(
    private auth: RegisterService,
    private weatherService: WeatherService,
    private unsplashService: UnsplashService
  ) {
    this.isLoggedIn = localStorage.getItem('user');

    this.user = this.auth.getUserLoggedIn();
    const db = getDatabase();
    const starRef = ref(db, 'favorites/' + this.user);

    onValue(starRef, snapshot => {
      this.dataFromFavorites = snapshot.val();
      Object.values(this.dataFromFavorites).map((data: string) => {
        if (this.favoriteCity.includes(data) === false) {
          this.favoriteCity.push(data);
        }
      });
      this.isAdded = this.favoriteCity.includes(this.nameToShow);
      
      if (this.favoriteCity.length !== 0 && this.isLoggedIn) {
        this.cityName = this.favoriteCity[0];
        this.getWeatherData(this.cityName);
      }
    });
  }

  ngOnInit(): void {

    this.unitSystem = this.weatherService.getUnitSystem();
    const measurementUnits =
      this.unitSystem === 'metric'
        ? apiConfig.measurementUnits.metric
        : apiConfig.measurementUnits.imperial;

    this.measureOfTemp = measurementUnits.temperature;

    this.weatherService.selectedCityListener().subscribe(selectedCity => {
      this.getWeatherData(selectedCity);
    });

    if (!this.isLoggedIn) {
      this.getWeatherData('Bucharest');
    }
  }

  changeUnit(unitSystem: string) {
    this.weatherService.updateUnitSystem(unitSystem);
  }

  async getWeatherData(cityName: any) {
    this.nameToShow = cityName;
    this.cityName = cityName;
    if (this.favoriteCity) {
      this.isAdded = this.favoriteCity.includes(this.nameToShow);
    }

    await fetch(
      'https://api.openweathermap.org/data/2.5/weather?q=' +
        cityName +
        '&appid=5fe302f14d5bd84b4b60562300f00762'
    )
      .then(response => response.json())
      .then(data => {
        this.setWeatherData(data);
      });
  }

  setWeatherData(data: any) {
    this.WeatherData = data;
    this.icon =
      'http://openweathermap.org/img/wn/' +
      this.WeatherData.weather[0].icon +
      '@2x.png';
    this.description = this.WeatherData?.weather[0]?.description;

    if (this.unitSystem === 'metric') {
      this.WeatherData.currentTemperature = this.convertKtoC(data.main.temp);
      this.WeatherData.minTemperature = this.convertKtoC(data.main.temp_min);
      this.WeatherData.maxTemperature = this.convertKtoC(data.main.temp_max);
    } else {
      this.WeatherData.currentTemperature = this.convertKtoF(data.main.temp);
      this.WeatherData.minTemperature = this.convertKtoF(data.main.temp_min);
      this.WeatherData.maxTemperature = this.convertKtoF(data.main.temp_max);
    }

    this.photoUrl = this.unsplashService.getImage(
      this.nameToShow.toLowerCase()
    );
    fetch(this.photoUrl)
      .then(photos => photos.json())
      .then(data => (this.cityImage = data?.results[0].urls.regular));
  }

  addFavorite() {
    this.weatherService.createFavorite(this.cityName);
    this.cityName = this.favoriteCity[this.favoriteCity.length - 1];
    if (this.favoriteCity) {
      this.getWeatherData(this.favoriteCity[this.favoriteCity.length - 1]);
    }
  }

  removeFavorite() {
    const db = getDatabase();
    this.key = Object.keys(this.dataFromFavorites).find(
      key => (this.dataFromFavorites as any)[key] === this.cityName
    );
    remove(ref(db, 'favorites/' + this.user + '/' + this.key));
    this.favoriteCity.filter(value => value !== this.key);
    window.location.reload();
  }

  convertKtoC(temp: number): string {
    return (temp - 273.15).toFixed(0);
  }

  convertKtoF(temp: number): string {
    return ((temp - 273.15) * (9 / 5) + 32).toFixed(0);
  }
}
