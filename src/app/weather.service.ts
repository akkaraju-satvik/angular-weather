import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { WeatherDataRaw } from './weather/WeatherDataRaw';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve(position);
      }, error => {
        reject(error);
      });
    });
  }

  async getWeather(): Promise<Observable<WeatherDataRaw>> {
    const position = await this.getPosition();
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${environment.apiKey}&units=metric`);
  }

  getWeatherFromCityName(cityName: string): Observable<WeatherDataRaw> {
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?q=${cityName}&appid=${environment.apiKey}&units=metric`);
  }
}