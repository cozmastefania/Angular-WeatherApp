import { Component, Input, OnInit, OnChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
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
  coord!: {
    lon: number;
    lat: number;
  };
  @Input() favorites!: Array<string>;

  measureOfTemp: string = '';
  unitSystem: string = '';

  forecastList: any[] = [];
  forecastSub: Subscription;

  constructor(
    private forecastService: ForecastService,
    private weatherService: WeatherService
  ) {}

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
