import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { WeatherComponent } from './weather/weather.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { InputFieldComponent } from './input-field/input-field.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { ShowKeyComponent } from './show-key/show-key.component';
import { AuthGuard } from './auth.guard';
import { NotAuthComponent } from './not-auth/not-auth.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherComponent,
    InputFieldComponent,
    ErrorComponent,
    ChartComponent,
    ShowKeyComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatDialogModule,
    NgChartsModule,
    MatButtonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([{path: 'notAuthorized', component: NotAuthComponent}, {path: 'getKey', component: ShowKeyComponent, canActivate: [AuthGuard]},{path: '', component: WeatherComponent}, {path: ':cityName', component: WeatherComponent}]),
    NgChartsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
