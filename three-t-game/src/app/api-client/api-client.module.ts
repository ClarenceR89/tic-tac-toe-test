import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiClientService } from './api-client.service';
import { UserService } from './controllers/user.service';
import { HttpModule } from '@angular/http';
import { GameService } from './controllers/game.service';
import { MoveService } from './controllers/move.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    ApiClientService,
    UserService,
    GameService,
    MoveService
  ]
})
export class ApiClientModule { }
