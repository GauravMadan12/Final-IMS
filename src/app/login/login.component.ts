import { Component, OnInit } from '@angular/core';
import { ImsserviceService } from '../imsservice.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ImsserviceService]
})
export class LoginComponent implements OnInit {

  constructor(
    private imsserv:ImsserviceService,
    private route:Router,
    private flashmsg:FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogin(val){
    {
      const data = {
        email: val.email,
        password: val.password
      }
      
    this.imsserv.senddata(data).subscribe(resData => {
      if(resData.success){
          this.imsserv.storeUser(resData.token,resData.user)
          this.flashmsg.show("Login Successful",{cssClass:'alert-success',timeout:3000})
          this.route.navigate(['dashboard'])
             

      }else{
        this.flashmsg.show(resData.msg,{cssClass:'alert-danger',timeout:3000})
        this.route.navigate(['/login'])
     
      }
    })
  }
}
}
