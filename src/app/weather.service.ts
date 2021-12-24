import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { WeatherDataRaw } from './weather/WeatherDataRaw';
import { Router } from '@angular/router';
import { ChartDataService } from './chart-data.service';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient, private chartData: ChartDataService) { }

  getWeather(position: GeolocationPosition): Observable<WeatherDataRaw> {
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${environment.apiKey}&units=metric`);
  }

  getWeatherFromCityName(cityName: string): Observable<WeatherDataRaw> {
    localStorage.setItem('cityName', cityName);
    return this.http.get<WeatherDataRaw>(`http://${environment.ROOT_URL}/data/2.5/weather?q=${cityName}&appid=${environment.apiKey}&units=metric`);
  }
}