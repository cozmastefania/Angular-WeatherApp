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

  // responsiveOptions = [{}];
  forecastList: any[] = [];
  forecastSub!: Subscription;

  constructor(
    private forecastService: ForecastService
  ) {
    // this.responsiveOptions = [
    //         {
    //             breakpoint: '1024px',
    //             numVisible: 4,
    //             numScroll: 4
    //         },
    //         {
    //             breakpoint: '768px',
    //             numVisible: 3,
    //             numScroll: 3
    //         },
    //         {
    //             breakpoint: '560px',
    //             numVisible: 2,
    //             numScroll: 2
    //         }
    //     ];
    }


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
