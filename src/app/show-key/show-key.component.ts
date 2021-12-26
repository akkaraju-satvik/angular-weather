import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-show-key',
  templateUrl: './show-key.component.html',
  styleUrls: ['./show-key.component.css']
})
export class ShowKeyComponent implements OnInit {
  key = environment.apiKey;

  constructor() { }

  ngOnInit(): void {
  }

}
