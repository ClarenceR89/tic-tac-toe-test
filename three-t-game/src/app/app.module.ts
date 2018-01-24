import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {ROUTES} from './app.routes';

import { AppComponent } from './app.component';
import { ApiClientModule } from './api-client/api-client.module';
import { AppService } from './app.service';

@NgModule({
  imports: [
    BrowserModule,
    ApiClientModule,
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    AppService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
