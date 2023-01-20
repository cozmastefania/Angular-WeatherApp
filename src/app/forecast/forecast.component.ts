import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnChanges, OnDestroy {
  @Input()
  coord!: {
    lon: number;
    lat: number;
  };
  @Input() measureOfTemp: string = "";

  forecastList: any[] = [];
  forecastSub!: Subscription;

  constructor(
    private forecastService: ForecastService
  ) { }

  ngOnChanges(): void {
    this.forecastSub = this.forecastService.getForecastByCity(this.coord.lon, this.coord.lat)
      .subscribe(data => {
        this.forecastList = data.list;
      })
  }

  ngOnDestroy(): void {
    this.forecastSub.unsubscribe();
  }

}
