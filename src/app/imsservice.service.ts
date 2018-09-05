import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import {Register} from './register';

@Injectable({
  providedIn: 'root'
})
export class ImsserviceService {

  private _getUrl = "/api/alldata";
  private _loginUrl = "/api/authenticate";
  private _proUrl="/api/profile";
  authToken:any;
  user:any;

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

  getProfile(){
    this.loadToken();
    let headers = new Headers({'Content-Type':'application/json','Authorization':this.authToken})
    let options = new RequestOptions({ headers:headers})
    return this._http.get(this._proUrl,options)
    .pipe(map((response: Response) => response.json()));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    console.log(token);
  }

  storeUser(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    console.log(user)
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
