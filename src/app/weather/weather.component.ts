import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { ServeDataService } from '../serve-data.service';
import { WeatherService } from '../weather.service';
import { WeatherData } from './WeatherData';
import { WeatherDataRaw } from './WeatherDataRaw';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherData: WeatherData | undefined;
  public positionError: GeolocationPositionError | undefined;
  public httpError: HttpErrorResponse | undefined;
  public isHttpError: Boolean = false
  public isPositionError: Boolean = false

  constructor(public dialog: MatDialog, private _weatherService: WeatherService, public _serveData: ServeDataService, private router: Router) { }
  
  formatData(data: WeatherDataRaw | undefined, currentLocation: Boolean): WeatherData | undefined {
    if(data === undefined) return undefined;
    return {
      currentLocation: currentLocation,
      country: currentLocation ? '' : data.sys?.country,
      temp: Number(data.main?.temp.toFixed(0)),
      feels_like: Number(data.main?.feels_like?.toFixed(0)),
      name: data.name,
      weather: {
        description: data.weather?.[0].description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
        icon: `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`
      }
    }
  }

  setHttpError(error: HttpErrorResponse) {
    this.httpError = error;
    this.isHttpError = true;
    this._serveData.loadState = false;
  }
  
  resetHttpError() {
    this.httpError = undefined;
    this.isHttpError = false;
  }

  ngOnInit(): void {
    if(this.router.url === '/') {
      navigator.geolocation.getCurrentPosition(position => {
        this._serveData.loadState = true
        this._weatherService.getWeather(position).subscribe(
          {
            next: data => {
              this.weatherData = this.formatData(data, true);
              this._serveData.loadState = false;
            },
          })
      }, error => {
        this.dialog.open(ErrorComponent, {data: {type: 'positionError', error: error}});
        this.positionError = error;
        this.isPositionError = true; this._serveData.loadState = false;
      })
    } else {
      this._serveData.loadState = true
      this._weatherService.getWeatherFromCityName(this.router.url.slice(1)).pipe(take(2)).subscribe(
        {
          next: data => {
            if(this.isHttpError) this.resetHttpError()
            this.weatherData = this.formatData(data, false);
            this._serveData.loadState = false;
          },
          error: error => {
            this.dialog.open(ErrorComponent, {data: {type: 'httpError', error: error}});
            this.setHttpError(error)
          }  
        }
      )
    }
    this._serveData.weatherData.subscribe(
      {
        next: data => {
          if(data instanceof HttpErrorResponse) {
            this.dialog.open(ErrorComponent, {data: {type: 'httpError', error: data}});
            this.setHttpError(data);
            this.weatherData = undefined;
            return;
          }
          if(data === undefined) return;
          if(this.isHttpError) this.resetHttpError()
          this.weatherData = this.formatData(data, false);
        }
      }
    )
  }
}
