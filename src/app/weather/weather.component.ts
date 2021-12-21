import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ServeDataService } from '../serve-data.service';
import { WeatherService } from '../weather.service';
import { WeatherData } from './WeatherData';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  public weatherData: WeatherData | undefined;
  public error: GeolocationPositionError | undefined;

  constructor(private _weatherService: WeatherService, private _serveData: ServeDataService) { }
  
  ngOnInit(): void {
    this._serveData.weatherData.subscribe(data => {
      console.log(data)
      if(data) {
        this.weatherData = {
          currentLocation: false,
          country: data.sys.country,
          temp: Number(data.main.temp.toFixed(0)),
          feels_like: Number(data.main.feels_like.toFixed(0)),
          name: data.name,
          weather: {
            description: data.weather[0].description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          }
        };
      } else this.weatherData = data
    })
    
    navigator.geolocation.getCurrentPosition((position): void => {
      this._weatherService.getWeather({ latitude: position.coords.latitude, longitude: position.coords.longitude }).subscribe(data => {
        console.log(data)
        this.weatherData = {
          currentLocation: true,
          temp: Number(data.main.temp.toFixed(0)),
          feels_like: Number(data.main.feels_like.toFixed(0)),
          name: data.name,
          weather: {
            description: data.weather[0].description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
            icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          }
        };
      });
    }, error => {
      this.error = error;
      console.log(error)
    })
  }
}
