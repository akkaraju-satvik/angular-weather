import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs"
import { WeatherDataRaw } from './weather/WeatherDataRaw';

@Injectable({
  providedIn: 'root'
})
export class ServeDataService {

  public loadState: Boolean = true;
  private _data = new BehaviorSubject<WeatherDataRaw | undefined>(undefined);
  
  weatherData = this._data.asObservable()

  constructor() { }

  sendData(data: WeatherDataRaw) {
    this._data.next(data)
  }

}
