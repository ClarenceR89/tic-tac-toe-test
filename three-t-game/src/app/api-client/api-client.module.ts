import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from './api-client.service';
import { UserService } from './controllers/user.service';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ApiClientService,
    UserService
  ]
})
export class ApiClientModule { }
