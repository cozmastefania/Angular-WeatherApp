import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, startWith } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { apiConfig } from 'src/app/config';

@Injectable({
  providedIn: 'root'
})
export class ForecastService {
  private forecastUpdateInterval = apiConfig.updateInterval.forecast;
  private unitSystem: string = '';

  constructor(private http: HttpClient) {
  }

  getForecastByCity(lon: number, lat: number): Observable<any> {
    return interval(this.forecastUpdateInterval).pipe(startWith(0)).pipe(switchMap(() =>
      this.http.get(
        `${apiConfig.host}/forecast?lat=${lat}&lon=${lon}&appid=${apiConfig.appId}&units=${this.unitSystem}`
      ).pipe(map((response: any) => response)
      )
    ))

  }

}
