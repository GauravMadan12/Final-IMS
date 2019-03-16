import { Injectable } from '@angular/core';
import {Http,Response, Headers,RequestOptions} from '@angular/http';
import { map } from 'rxjs/operators';
import {Register} from './register';
import {tokenNotExpired} from 'angular2-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImsserviceService {

  private _getUrl = "/api/alldata";
  private _loginUrl = "/api/authenticate";
  private _proUrl="/api/profile";
  private _contactUrl = "/api/data";
  private _mailUrl = "/ api/mails";
  private _alluserUrl = "/api/usercontact";
  private _groupMail = "/api/gpmails";
  authToken:any;
  user:any;

  constructor(private _http:Http,
        private http:HttpClient
    ) { }

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

  loggedIn(){
    return tokenNotExpired('id_token');
  }

  storeUser(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('name',user.name)
    localStorage.setItem('email',user.email)
    console.log(user)
    this.authToken = token;
    this.user = user;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  sendContact(data){
    let headers = new Headers({'Content-Type':'application/json'})
    let options = new RequestOptions({ headers:headers})
    return this._http.post(this._contactUrl, JSON.stringify(data),options)
    .pipe(map((response: Response) => response.json()));
  }

  sendMsg(msg){
  let headers = new Headers({'Content-Type':'application/json'})
  let options = new RequestOptions({ headers:headers})
  return this._http.get("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles="+msg.mobiles+"&authkey=228815AVZ7FrV8NH5b5dd1ed&country=91&message="+msg.message,options)
  .pipe(map((response: Response) => response.json()));
    // console.log(msg)
}

sendMail(val){
  let headers = new Headers({'Content-Type':'application/json'})
  let options = new RequestOptions({ headers:headers})
  return this._http.post(this._mailUrl, JSON.stringify(val),options)                                                                    
  .pipe(map((response: Response) => response.json()));
}
  
  getContacts(user){
    let headers = new Headers({'Content-Type':'application/json'})
  let options = new RequestOptions({ headers:headers})
  return this._http.post(this._alluserUrl, {user},options)                                                                    
  .pipe(map((response: Response) => response.json()));
  // console.log(user)
}

sendGpMail(value,data,sub){
  let headers = new Headers({'Content-Type':'application/json'})
  let options = new RequestOptions({ headers:headers})
  return this._http.post(this._groupMail,{value,data,sub},options)                                                                    
  .pipe(map((response: Response) => response.json()));
  // console.log("VAlue"+value)
  // console.log("data"+data)
  // console.log("Subject"+sub)
}

sendMessage(val,msg){
  let headers = new Headers({'Content-Type':'application/json'})
  let options = new RequestOptions({ headers:headers})
  return this._http.get("http://api.msg91.com/api/sendhttp.php?sender=MSGIND&route=4&mobiles="+val+"&authkey=##################&country=91&message="+msg,options)
  .pipe(map((response: Response) => response.json()));
}

// File Downloading 
downloadFile(file:string){
  var body = {filename:file};
  return this.http.post("http://localhost:3000/file/download",body,{
    responseType : 'blob',
    headers:new HttpHeaders().append('Content-Type','application/json')
  });
}

}
