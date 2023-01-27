import { Injectable } from '@angular/core';
import { appConfig } from 'src/app/config';
import { LocalstorageService } from 'src/app/services/localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private unitSystem: string = '';

  constructor(private localStorageService: LocalstorageService) {
    this.unitSystem =
      this.localStorageService.get('unit') || appConfig.defaultUnit;
  }

  getUnitSystem(): string {
    return this.unitSystem;
  }

  updateUnitSystem(unitSystem: string): void {
    this.localStorageService.set('unit', unitSystem);
    setTimeout(() => window.location.reload(), 300);
  }
}
