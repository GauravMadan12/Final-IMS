import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import {Register} from './register';

@Injectable({
  providedIn: 'root'
})
export class ImsserviceService {

  private _getUrl = "/api/alldata";
  private _loginUrl = "/api/authenticate"
  
  constructor(private _http:Http) { }

  getdata(val){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._getUrl, JSON.stringify(val),options)
    .pipe(map((response: Response) => response.json()));
  }

  senddata(val){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._loginUrl, JSON.stringify(val),options)
    .pipe(map((response: Response) => response.json()));
  }
}
