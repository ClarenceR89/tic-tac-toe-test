import { Component, OnInit } from '@angular/core';
import { Assets } from './core/assets';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Asset = Assets;

  constructor() {

  }

  ngOnInit() {

  }
}
