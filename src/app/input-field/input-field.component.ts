import { Component, OnInit } from '@angular/core';
import { ServeDataService } from '../serve-data.service';
import {WeatherService} from '../weather.service';
import { Router } from '@angular/router';
import { ChartDataService } from '../chart-data.service';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})

export class InputFieldComponent implements OnInit {

  constructor(private _weatherService: WeatherService, private _serveData: ServeDataService, private router: Router, private chartData: ChartDataService) { }

  ngOnInit(): void {
  }

  getWeather(e: Event) {
    e.preventDefault();
    const cityName = document.querySelector('#cityName') as HTMLInputElement;
    let cityVal = cityName.value;
    this._serveData.loadState = true;
    this.router.navigateByUrl('/'+cityVal);
    this.chartData.getData(cityVal).subscribe(
      {
        next: data => {
          this.chartData.serveData(data);
        },
        error: error => {
          this.chartData.serveData(error);
        }
      }
    )
    this._weatherService.getWeatherFromCityName(cityName.value).subscribe(
      {
        next:data => {
          this._serveData.loadState = false;
          this._serveData.sendData(data);
        },
        error: error => {
          cityName.value = cityVal
          this._serveData.loadState = false;
          this._serveData.sendData(error)
        }
      }
    )
    cityName.value = ''
    cityName.blur()
  }
}
