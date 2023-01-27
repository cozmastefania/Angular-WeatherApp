import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string): any {
    let value = localStorage.getItem(key);
    if (value) {
      value = JSON.parse(value);
    }

    return value;
  }
}
