import { Component, Input, OnChanges } from '@angular/core';

import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnChanges {
  @Input()
  coord!: {
    lon: number;
    lat: number;
  };
  @Input() measureOfTemp: string = "";

  forecastList: any[] = [];

  constructor(
    private forecastService: ForecastService
  ) { }

  ngOnChanges(): void {
    this.forecastService.getForecastByCity(this.coord.lon, this.coord.lat)
      .subscribe(data => {
        this.forecastList = data.list;
        console.log(this.forecastList);
      })
    console.log(this.coord)
  }

}
