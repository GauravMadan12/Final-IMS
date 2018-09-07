import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  constructor(private imsserv:ImsserviceService) { }

  ngOnInit() {
  }

  onSendMail(val){
    this.imsserv.sendMail(val).subscribe(resData => console.log(resData))
}
}
