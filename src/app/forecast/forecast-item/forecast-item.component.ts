import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forecast-item',
  templateUrl: './forecast-item.component.html',
  styleUrls: ['./forecast-item.component.css']
})
export class ForecastItemComponent implements OnInit {
  @Input() forecast: any;
  @Input() currentDay: boolean = false;
  @Input() date: number = 0;
  @Input() temperatureDay: number = 0;
  @Input() temperatureNight: number = 0;
  @Input() description: string = "";
  @Input() iconClassname: string = "";
  @Input() measureOfTemp: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
