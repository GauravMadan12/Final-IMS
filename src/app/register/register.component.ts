import { Component, OnInit } from '@angular/core';
import {Register} from './../register';
import {ImsserviceService} from '../imsservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ImsserviceService]
})
export class RegisterComponent implements OnInit {

  regis:Array<Register>;
  validEmail:boolean = false

  constructor(
    private _imsserv:ImsserviceService
  ) { }

  ngOnInit() {


  }


  onRegis(val){
    console.log(val)
    this._imsserv.getdata(val).subscribe(resData => console.log(resData))
  }

}
