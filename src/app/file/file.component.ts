import { Component, OnInit } from '@angular/core';
import {FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {ImsserviceService} from '../imsservice.service';
import {saveAs} from 'file-saver';

const url = "http://localhost:3000/file/upload";

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
  
})
export class FileComponent implements OnInit {

  uploader:FileUploader =new FileUploader({url:url});

  attachmentList:any = [];

  constructor(private _imsserv:ImsserviceService) {
    this.uploader.onCompleteItem = (item:any,response:any, status:any, headers:any) =>{
      this.attachmentList.push(JSON.parse(response));
    }
   }

   download(index){
     var filename = this.attachmentList[index].uploadname;
     this._imsserv.downloadFile(filename)
     .subscribe(
       data => saveAs(data,filename),
       error => console.error(error)
     )
   }

  ngOnInit() {
  }

}
