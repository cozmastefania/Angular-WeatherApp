import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component } from '@angular/core';

import { apiConfig, appConfig } from 'src/app/config';

interface City {
  name: string,
  code: string
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})



export class HeaderComponent {
 @Input() currentUnitSystem: string = "";
 @Input() listOfFavorites!: Array<string>;
 @Output() changeUnit: EventEmitter<string> = new EventEmitter();
 
  isClicked!: boolean;
  isUnitSwitcherChecked = false;
  
  cities!: City[];
  selectedCity!: City;

  constructor() {
     this.cities = [
      {name: 'New York', code: 'NY'},
      {name: 'Rome', code: 'RM'},
      {name: 'London', code: 'LDN'},
      {name: 'Istanbul', code: 'IST'},
      {name: 'Paris', code: 'PRS'}
  ];
  }
  ngOnInit() {
    this.isUnitSwitcherChecked = this.currentUnitSystem === appConfig.defaultUnit;
    this.isClicked = false;
   

    console.log(this.listOfFavorites);
    this.listOfFavorites.map( (city:string) => 
      // const obj = {name: city};
      // console.log(obj);
      // this.cityes.push(obj)
      console.log(city));
    
    // console.log(this.cityes);
  }

   onChangeUnitSwitcher() {
    const unitSystems = Object.keys(apiConfig.measurementUnits);
    const unitIndex = this.isUnitSwitcherChecked ? 1 : 0;

    this.changeUnit.emit(unitSystems[unitIndex]);
  }
}
