import { Component, OnInit } from '@angular/core';
import {ImsserviceService} from '../imsservice.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private imsserv:ImsserviceService
  ) { }

  ngOnInit() {
  }

  onSend(msg){
    this.imsserv.sendMsg(msg)
    .subscribe(resMsg => console.log(resMsg.json()))
    console.log(msg)
  }
}
