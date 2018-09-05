import { Component,OnInit } from '@angular/core';
import { ImsserviceService } from './imsservice.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  value ;
  constructor(
    private imsserv:ImsserviceService,
    private router:Router,
    private flashmsg:FlashMessagesService
  ){}

  onLogout(){
    this.imsserv.logout();
    this.flashmsg.show("You are now logged out",{cssClass:"alert-success",timeout:5000});
    this.router.navigate(['/login']);
    return false;
  }

  ngOnInit(){
     const data = localStorage.getItem('id_token');
     if(data == null){
       this.value = false;
     }else{
       this.value = true;
     }
    console.log("Value is"+data)
  }
}
