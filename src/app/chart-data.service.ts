import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChartData } from './chart/ChartData';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ChartDataService {
  private _data = new BehaviorSubject<ChartData | undefined>(undefined);
  loadState = true
  chartData = this._data.asObservable();
  constructor(private http: HttpClient, private router: Router) { }

  getData(cityName: string = ''): Observable<ChartData> {
    return this.http.get<ChartData>('http://localhost:3000/'+cityName.toLowerCase());
  }

  serveData(data: ChartData): void {
    this._data.next(data);
  }
}
