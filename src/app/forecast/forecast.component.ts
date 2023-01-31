import { Component, Input, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { apiConfig } from 'src/app/config';

import { ForecastService } from 'src/app/services/forecast.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css'],
})
export class ForecastComponent implements OnInit, OnChanges, OnDestroy {
  @Input()
  coord: {
    lon: number;
    lat: number;
  };

  @Input() isLoggedIn: boolean;

  @Input() favorites: Array<string>;

  measureOfTemp: string;
  unitSystem: string;

  forecastList: any[];
  forecastSub: Subscription;

  responsiveOptions: any[];

  constructor(
    private forecastService: ForecastService,
    private weatherService: WeatherService
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '2560px',
        numVisible: 8,
        numScroll: 8,
      },
      {
        breakpoint: '1440px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '1024px',
        numVisible: 4,
        numScroll: 4,
      },
      {
        breakpoint: '768px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '600px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '480px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit() {
    this.unitSystem = this.weatherService.getUnitSystem();
    const measurementUnits =
      this.unitSystem === 'metric'
        ? apiConfig.measurementUnits.metric
        : apiConfig.measurementUnits.imperial;

    this.measureOfTemp = measurementUnits.temperature;
  }

  ngOnChanges(): void {
    this.forecastSub = this.forecastService
      .getForecastByCity(this.coord.lon, this.coord.lat)
      .subscribe(data => {
        this.forecastList = data.list;
      });
  }

  changeUnit(unitSystem: string) {
    this.weatherService.updateUnitSystem(unitSystem);
  }

  ngOnDestroy(): void {
    this.forecastSub.unsubscribe();
  }
}
