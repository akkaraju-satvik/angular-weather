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

  getWeather({ latitude, longitude }: { latitude: number; longitude: number; }): Observable<WeatherDataRaw> {
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${environment.apiKey}&units=metric`);
  }

  getWeatherFromCityName(cityName: string): Observable<WeatherDataRaw> {
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?q=${cityName}&appid=${environment.apiKey}&units=metric`);
  }
}