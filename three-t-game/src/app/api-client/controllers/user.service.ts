import { Injectable } from '@angular/core';
import { ApiClientService } from '../api-client.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { Response } from '@angular/http';

@Injectable()
export class UserService {

  constructor(
    private _apiClient: ApiClientService
  ) { }

  get(): Observable<User> {
    const url = `/api/users`;
    return this._apiClient.get<User>(url);
  }

  set(newUser: User): Observable<User> {
    const url = `/api/users`;
    return this._apiClient.post<User>(url, newUser);
  }
}
