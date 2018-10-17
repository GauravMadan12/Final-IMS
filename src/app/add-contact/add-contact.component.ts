import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';
import {ValidationService} from '../validation.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  val:any;
  constructor(
    private imsserv:ImsserviceService,
    private _flashmsg:FlashMessagesService,
    private _validserv:ValidationService
    ) { }

  ngOnInit() {
    this.val = localStorage.getItem('name');
    // console.log(this.val)

  }

  onSubmit(data){
    const demo = {
      createdby:this.val,
      name:data.name,
      email:data.email,
      phone:data.phone
    }
    if(!this._validserv.isValid(data.email)){
      this._flashmsg.show("Please enter a Valid Email",{cssClass:'alert-danger',timeout:6000})
    }
    else if(!this._validserv.isNumber(data.phone)){
      this._flashmsg.show("Please enter a Valid phone number",{cssClass:'alert-danger',timeout:6000})

    }else{
    this.imsserv.sendContact(demo).subscribe(resData => {
      if(resData){
        this._flashmsg.show("Contact Added Successfully!!!",{cssClass:'alert-success',timeout:6000});
      }
    })
  }
   }
}
