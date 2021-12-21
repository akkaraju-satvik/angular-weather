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
    this._serveData.acceptData(undefined)
    this._weatherService.getWeatherFromCityName(cityName.value).subscribe(data => {
      this._serveData.acceptData(data);
    })
    this.router.navigateByUrl('/weather/' + cityName.value + '/');
    cityName.value = ''
    cityName.blur()
  }
}
