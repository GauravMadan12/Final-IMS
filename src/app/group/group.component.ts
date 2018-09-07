import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user:any
  data:any;
  constructor(private imsserv:ImsserviceService) { }

  ngOnInit() {
    this.user = localStorage.getItem('name');
    this.imsserv.getContacts(this.user).subscribe(resData => {
    
      this.data = resData;
      console.log(this.data);
    });

  }


}
