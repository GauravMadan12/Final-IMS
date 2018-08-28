import { Component, OnInit } from '@angular/core';
import {Register} from './../register';
import {ImsserviceService} from '../imsservice.service';
import {ValidationService} from '../validation.service';
import {ToasterService} from '../toaster.service';

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
    private _toastrserv:ToasterService
  ) { }

  ngOnInit() {


  }


  onRegis(val){
    console.log(val)
    // if(!this._validserv.isComp(val)){
    //   this._toastrserv.Error("Please fill all the fields")
    // }else
    if(!this._validserv.isValid(val.email)){
      this._toastrserv.Error("Please enter a valid email")
    }
    else if(!this._validserv.isNumber(val.phone)){
      this._toastrserv.Error("Please enter a valid phone number")
    }else{
    this._imsserv.getdata(val).subscribe(resData => console.log(resData))
  }
  }
}
