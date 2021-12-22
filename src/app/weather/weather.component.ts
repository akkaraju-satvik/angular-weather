import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private _weatherService: WeatherService, private _serveData: ServeDataService, private router: Router) { }
  
  async ngOnInit(): Promise<void> {
    this.router.navigateByUrl('/')
    this._serveData.weatherData.subscribe(data => {
      if(data !== undefined) {
        this.weatherData = {
          currentLocation: false,
          country: data?.sys?.country,
          temp: Number(data?.main?.temp?.toFixed(0)),
          feels_like: Number(data?.main?.feels_like?.toFixed(0)),
          name: data?.name,
          weather: {
            description: data?.weather?.[0]?.description?.split(' ')?.map(word => word[0].toUpperCase() + word.slice(1))?.join(' '),
            icon: `http://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}@2x.png`,
          }
        };
      } else this.weatherData = data
    })

    const weatherObservable = await this._weatherService.getWeather()
    weatherObservable.subscribe(data => {
      this.weatherData = {
        country: '',
        currentLocation: true,
        temp: Number(data.main.temp.toFixed(0)),
        feels_like: Number(data.main.feels_like.toFixed(0)),
        name: data.name,
        weather: {
          description: data.weather[0].description.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' '),
          icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        }
      };
    })
  }
}
