import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { WeatherDataRaw } from './weather/WeatherDataRaw';

@Injectable({
  providedIn: 'root'
})
export class ServeDataService {

  private _data = new BehaviorSubject<WeatherDataRaw | undefined>({} as WeatherDataRaw);
  weatherData = this._data.asObservable()

  constructor() { }

  acceptData(data: WeatherDataRaw | undefined) {
    this._data.next(data)
  }
}
