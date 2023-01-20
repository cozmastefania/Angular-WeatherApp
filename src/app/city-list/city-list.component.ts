import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {
  cityList = ["Cluj", "Oradea", "Bucuresti", "Timisoara"];

  constructor() { }

  ngOnInit(): void {
  }

}
