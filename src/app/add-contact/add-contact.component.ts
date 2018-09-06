import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';
@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.css']
})
export class AddContactComponent implements OnInit {

  val:any;
  constructor(private imsserv:ImsserviceService) { }

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
    this.imsserv.sendContact(demo).subscribe(resData => {
      console.log(resData)
    })
    console.log(demo)
  }
}
