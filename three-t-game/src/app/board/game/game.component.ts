import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { GameService } from '../../api-client/controllers/game.service';
import { Game } from '../../api-client/models/game.model';
import { HubConnection } from '@aspnet/signalr-client';
import { Move } from '../../api-client/models/move.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  private _hubConnection: HubConnection;
  win: boolean = false;
  winText: string = '';
  finished: boolean = false;

  constructor(
    private _app: AppService,
    private _game: GameService
  ) { }

  ngOnInit() {
    //TODO: hook up move signal-r
    this._hubConnection = new HubConnection('http://localhost:5000/move');

    this._hubConnection.on('Move', (data: Move) => {
      this.game.moves.push(data);
      console.log('Move', data);
    });
    this._hubConnection.on('AIMove', (data: Move) => {
      this.game.moves.push(data);
      console.log('AIMove', data);
    });
    this._hubConnection.on('Win', (data: any) => {
      this.win = data.win;
      if (this.win) {
        this.winText = 'YOU WIN!';
      }
      else {
        this.winText = 'GAME OVER!';
      }
      this.finished = true;
      console.log('Win', data);
    });
    this._hubConnection.start().then(res => {
      console.log('Move Hub Started');
    }, err => {
      console.log('Move hub start failed', err);
    });
  }

  startAIGame() {
    this._game.createGame({
      playerOneId: this._app.getUser().id,
      playerTwoId: 1
    }).subscribe(game => {
      this.game = game;
      this.game.moves = [];
    });
  } 

}
