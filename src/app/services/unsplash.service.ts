import { Injectable } from '@angular/core';

import { unsplash } from 'src/app/config';
import { createApi } from 'unsplash-js';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private unsplashApi;

  constructor() {
    this.unsplashApi = createApi({
      accessKey: unsplash.accessKey,
    });
  }

  public getImage(cityName: string): string {
    return (
      unsplash.apiURL +
      '?client_id=' +
      unsplash.accessKey +
      '&query=' +
      cityName +
      '&orientation=landscape'
    );
  }
}
