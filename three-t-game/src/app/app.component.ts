import { Component, OnInit } from '@angular/core';
import { Assets } from './core/assets';
import { AppService } from './app.service';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  Asset = Assets;

  constructor(
    private _app: AppService,
    private _router: Router
  ) {

  }

  ngOnInit() {
    if (isNullOrUndefined(this._app.getUser())) {
      //redirect to game
      this._router.navigate(['/register/new']);
    }
  }

  //TODO register signal-r
}
