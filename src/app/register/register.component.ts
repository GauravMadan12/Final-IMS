import { Component, OnInit } from '@angular/core';
import {Register} from './../register';
import {ImsserviceService} from '../imsservice.service';
import {ValidationService} from '../validation.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ImsserviceService,ValidationService]
})
export class RegisterComponent implements OnInit {

  regis:Array<Register>;
  validEmail:boolean = false

  constructor(
    private _imsserv:ImsserviceService,
    private _validserv: ValidationService,
    private _flashmsg:FlashMessagesService,
    private _router:Router
  ) { }

  ngOnInit() {


  }


  onRegis(val){
    console.log(val)
    if(!this._validserv.isValid(val.email)){
      this._flashmsg.show("Please enter a Valid Email",{cssClass:'alert-danger',timeout:6000})
    }
    else if(!this._validserv.isNumber(val.phone)){
      this._flashmsg.show("Please enter a Valid phone number",{cssClass:'alert-danger',timeout:6000})

    }else{
      
    this._imsserv.getdata(val).subscribe(resData =>{
      if(resData){
        this._flashmsg.show("Registration Done!!!",{cssClass:'alert-success',timeout:6000});
        this._router.navigate(['/login'])
      }else{
        this._flashmsg.show("Error!!",{cssClass:'alert-danger',timeout:6000})
        this._router.navigate(['/register'])      
    }
    // console.log(resData)
    })
  }
  }
}
