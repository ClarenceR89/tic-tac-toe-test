import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from '../api-client.service';
import { Move } from '../models/move.model';

@Injectable()
export class MoveService {

  constructor(
    private _apiClient: ApiClientService
  ) { }

  createMove(move: Move): Observable<Move> {
    const url = '/api/moves';
    return this._apiClient.post<Move>(url, move);
  }

}
