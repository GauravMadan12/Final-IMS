import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user:Object;
  constructor(
    private imsserv:ImsserviceService,
    // private router:Route
  ) { }

  ngOnInit() {
    this.imsserv.getProfile().subscribe(data => {
      this.user = data.user;
      console.log(data)
    },
    err => {
      console.log(err)
      return false;
    });
  }

}
