import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Game } from '../../api-client/models/game.model';
import { MoveService } from '../../api-client/controllers/move.service';
import { AppService } from '../../app.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnChanges {
  @Input() game: Game;
  tiles: any[] = Array(9);
  turn: number;
  busy: boolean = false;
  @Input() finished: boolean = false;

  constructor(
    private _app: AppService,
    private _move: MoveService
  ) { }

  ngOnInit() {
  }

  ngOnChanges(params) {
    //detect changes to game
    if (!this.game.moves) {
      this.game.moves = [];
      this.turn = this.game.playerOneId;
    }
  }

  makeMove(i: number) {
    //if (this.turn !== this._app.getUser().id) return;
    if (this.busy || this.finished) return;

    let axis = this.getTileAxis(i + 1);
    this._move.createMove({
      gameId: this.game.id,
      x: axis[0],
      y: axis[1],
      userId: this._app.getUser().id
    }).subscribe(move => {
      if (move) {
        this.turn = this.game.playerTwoId;//set the turn to the other player
        this.game.moves.push(move);
      }
    });
  }

  getNaught(i: number) {
    return this.checkTileIndicator(i, this.game.playerOneId);
  }

  getCross(i: number) {
    return this.checkTileIndicator(i, this.game.playerTwoId);
  }

  checkTileIndicator(i: number, playerId: number) {
    if (this.game && this.game.moves) {
      let axis = this.getTileAxis(i + 1);
      let move = this.game.moves.find(move => move.x == axis[0] && move.y == axis[1]);
      if (move) {
        return (move.userId == playerId);
      }
    }
  }

  checkTile(i: number): boolean {
    let axis = this.getTileAxis(i + 1);
    let move = this.game.moves.find(move => move.x == axis[0] && move.y == axis[1]);
    return isNullOrUndefined(move);
  }

  getTileAxis(index): [number, number] {
    if (index <= 3) {
      return [index, 1];
    }
    else if (index > 3 && index <= 6) {
      return [index - 3, 2];
    }
    else {
      return [index - 6, 3];
    }
  }
}
