import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css'],
})
export class ForecastItemComponent implements OnInit {
  @Input() forecast: any;
  @Input() measureOfTemp: string = '';
  time: string = '';
  date: any;
  temp: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.time = `${this.forecast.dt_txt.split(' ')[1].split(':')[0]}:00`;
    var date = new Date(this.forecast.dt_txt);
    this.date = date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
    });
    this.temp = Math.round(this.forecast.main.temp);
  }
}
