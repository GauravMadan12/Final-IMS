import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';
import {Route} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  constructor(
    private imsserv:ImsserviceService,
    // private router:Route
  ) { }

  ngOnInit() {
    this.imsserv.getProfile().subscribe(data =>
    console.log(data)
    );
  }

}
