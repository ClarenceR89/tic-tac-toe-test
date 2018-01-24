import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class ApiClientService {

  constructor(
    private _http: Http
  ) {

  }

  get<T>(path: string): Observable<T> {
    const url = environment.apiUrl + path;

    return this._http.get(url, this.appendHeaders()).map(res => {
      return this.extractBody(res) || res;
    }).do(() => {
      console.log('Get Complete: ', path)
    });
  }

  post<T>(path: string, body: any): Observable<T> {
    const url = environment.apiUrl + path;

    return this._http.post(url, JSON.stringify(body), this.appendHeaders()).map(res => {
      return this.extractBody(res) || res;
    }).do(() => {
      console.log('Post Complete: ', path)
    });
  }

  put(path: string, body: any): Observable<Response> {
    const url = environment.apiUrl + path;

    return this._http.put(url, body, this.appendHeaders()).map(res => {
      return this.extractBody(res) || res;
    }).do(() => {
      console.log('Put Complete: ', path)
    });
  }

  delete(path: string): Observable<Response> {
    const url = environment.apiUrl + path;

    return this._http.delete(url, this.appendHeaders()).map(res => {
      return this.extractBody(res) || res;
    }).do(() => {
      console.log('Post Complete: ', path)
    });
  }

  appendHeaders() {
    //headers
    //TODO: If we start using auth headers append here
    const options = new RequestOptions({
      headers: new Headers()
    });
    options.headers.set('Content-Type', 'application/json');
    return options;
  }

  extractBody(res: Response) {
    let body;
    try {
      body = res.json();
    } catch (error) {
      body = null;
    }
    return body;
  }
}
