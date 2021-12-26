import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  getToken() {
    return this.http.post<boolean>('http://localhost:3000/keyAuth', {authToken: 1235});
  }
}
