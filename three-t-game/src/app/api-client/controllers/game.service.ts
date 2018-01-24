import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Observable } from 'rxjs/Observable';
import { Game } from '../models/game.model';

@Injectable()
export class GameService {

  constructor(
    private _apiClient: ApiClientService
  ) { }

  get(id: number): Observable<Game> {
    const url = `/api/games/${id}`;
    return this._apiClient.get<Game>(url);
  }

  getByUserId(userId: number): Observable<Game[]> {
    const url = `GET /api/games/user/${userId}`;
    return this._apiClient.get<Game[]>(url);
  }

  createGame(game: Game): Observable<Game> {
    const url = `/api/games`;
    return this._apiClient.post<Game>(url, game);
  }
}
