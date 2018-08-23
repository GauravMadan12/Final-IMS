import { Component, OnInit } from '@angular/core';
import { ImsserviceService } from '../imsservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ImsserviceService]
})
export class LoginComponent implements OnInit {

  constructor(
    private imsserv:ImsserviceService,
    private route:Router
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
      // this.route.navigate(['/dashboard'])
      console.log(resData)})
  }
}
}
