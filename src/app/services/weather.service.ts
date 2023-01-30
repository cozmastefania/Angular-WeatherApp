import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { appConfig } from 'src/app/config';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { map } from 'rxjs';
import { RegisterService } from 'src/app/services/register.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  favoritesRef: AngularFireList<object>;
  dataFromFavorites: object;
  favoriteCity: Array<string> = [];
  user: string;
  private unitSystem: string = '';
  private selectedCityEvent = new BehaviorSubject<string>('');

  constructor(
    private firedb: AngularFireDatabase,
    private registerService: RegisterService,
    private localStorageService: LocalstorageService
  ) {
    this.user = this.registerService.getUserLoggedIn();
    this.favoritesRef = firedb.list(`favorites/${this?.user}`);
    this.unitSystem =
      this.localStorageService.get('unit') || appConfig.defaultUnit;
  }

  getCities() {
    return this.favoritesRef
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  createFavorite(fav: any) {
    if (this.favoriteCity.includes(fav)) {
    }
    return this.favoritesRef.push(fav);
  }

  getUnitSystem(): string {
    return this.unitSystem;
  }

  updateUnitSystem(unitSystem: string): void {
    this.localStorageService.set('unit', unitSystem);
    setTimeout(() => window.location.reload(), 300);
  }

  emitSelectedCityEvent(name: string) {
    this.selectedCityEvent.next(name);
  }

  selectedCityListener() {
    return this.selectedCityEvent.asObservable();
  }
}
