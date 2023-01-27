import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

import { apiConfig, appConfig } from 'src/app/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Input() currentUnitSystem: string = '';
  @Input() listOfFavorites!: Array<string>;
  @Input() getWeather!: (args: any) => void;
  @Output() changeUnit: EventEmitter<string> = new EventEmitter();

  isClicked!: boolean;
  isUnitSwitcherChecked = false;

  selectedCity!: string;

  constructor() {}

  ngOnInit() {
    this.isUnitSwitcherChecked =
      this.currentUnitSystem === appConfig.defaultUnit;
    this.isClicked = false;
  }

  getName(event: any) {
    this.selectedCity = event.target.textContent;
    console.log(this.selectedCity);
    if (this.selectedCity) {
      this.getWeather(this.selectedCity);
    }
  }

  onChangeUnitSwitcher() {
    const unitSystems = Object.keys(apiConfig.measurementUnits);
    const unitIndex = this.isUnitSwitcherChecked ? 1 : 0;

    this.changeUnit.emit(unitSystems[unitIndex]);
  }
}
