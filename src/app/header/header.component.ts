import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

import { apiConfig, appConfig } from 'src/app/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 @Input() currentUnitSystem: string = "";
 @Output() changeUnit: EventEmitter<string> = new EventEmitter();
 
  isClicked!: boolean;
  isUnitSwitcherChecked = false;

  ngOnInit() {
    this.isUnitSwitcherChecked = this.currentUnitSystem === appConfig.defaultUnit;
    this.isClicked = false;
  }

   onChangeUnitSwitcher() {
    const unitSystems = Object.keys(apiConfig.measurementUnits);
    const unitIndex = this.isUnitSwitcherChecked ? 1 : 0;

    this.changeUnit.emit(unitSystems[unitIndex]);
  }

  onClickFavorites() {
    this.isClicked = true;
  }
}
