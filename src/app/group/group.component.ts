import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  user:any;
  data:any;
  email=[];
  name=[];
  num=[];
  msg='';
  sub='';
  item = '';
  item1 = '';

  constructor(private imsserv:ImsserviceService) { }

  ngOnInit() {
    this.user = localStorage.getItem('name');
    this.imsserv.getContacts(this.user).subscribe(resData => {
    
      this.data = resData;
      // console.log(this.data);
    });

  }

  func(val){
    this.email.push(val.email)
    this.name.push(val.name)
    this.num.push(val.phone)
    console.log(this.email)
  }

  onSubmit(data){
    console.log(this.email)
    this.msg = data.message
    this.sub = data.subject
    this.imsserv.sendGpMail(this.email,this.msg,this.sub)
     .subscribe(resData=> console.log(resData))
  }

  sendMsg(vals){
      this.item1 = vals.msg;
      this.num.forEach(element => {
       this.imsserv.sendMessage(element,vals.msg)
      .subscribe(resData => console.log(resData))
    });
}

}
