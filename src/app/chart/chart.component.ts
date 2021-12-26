import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartType } from 'chart.js'
import { BaseChartDirective } from 'ng2-charts'
import { ChartDataService } from '../chart-data.service';
import { ChartData } from './ChartData';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  public lineChartData: ChartConfiguration['data'] | undefined;
  error = false
  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
    },
    elements: {
      line: {
        tension: 0,
        borderJoinStyle: "round",
      },
      point: {
        radius: 0
      }
    }
  };
  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor(public chartData: ChartDataService, public location: Location) { }

  setChartData(data: ChartData) {
    this.lineChartData = {
      datasets: data.data.map(dataset => {
        return {
          label: dataset.name,
          data: dataset.marks,
          fill: false,
          borderColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          backgroundColor: '#' + Math.floor(Math.random() * 16777215).toString(16),
          pointRadius: 3,
          hitRadius: 20
        }
      }),
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    }
    this.chartData.loadState = false;
  }

  setError() {
    this.error = true;
    this.chartData.loadState = false;
  }

  ngOnInit(): void {
    if(this.location.path() !== '/') {
      this.chartData.getData(this.location.path().slice(1)).subscribe(
        {
          next: (data) => {
            if(!data) {this.chartData.loadState = false; return}
            if(this.error) this.error = false;
            data ? this.setChartData(data) : this.setError()
          },
          error: () => this.setError()
        }
      )
    }
    this.chartData.chartData.subscribe(
      {
        next: (data) => {
          if(data instanceof HttpErrorResponse) {
            this.setError()
            return;
          }
          if(data === undefined) return
          if(this.error) this.error = false
          this.setChartData(data)
        }
      }
    )
  }
}
