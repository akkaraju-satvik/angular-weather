import { Component, OnInit } from '@angular/core';
import { ServeDataService } from '../serve-data.service';
import {WeatherService} from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css']
})

export class InputFieldComponent implements OnInit {

  constructor(private _weatherService: WeatherService, private _serveData: ServeDataService, private router: Router) { }

  ngOnInit(): void {
  }

  getWeather(e: Event) {
    e.preventDefault();
    const cityName = document.querySelector('#cityName') as HTMLInputElement;
    this._serveData.sendData(undefined)
    this._weatherService.getWeatherFromCityName(cityName.value).subscribe(data => {
      this._serveData.sendData(data);
    })
    this.router.navigateByUrl('/weather/' + cityName.value + '/');
    cityName.value = ''
    cityName.blur()
  }
}
