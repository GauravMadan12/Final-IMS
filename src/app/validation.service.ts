import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  // isComp(val){
  //   if(val.fname == undefined || val.lname == undefined || val.email == undefined || val.password == undefined || val.phone == undefined ){
  //     return false
  //   }
  // }
  isValid(val){
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return re.test(val)
  }

  isNumber(val){
    const rex = /^\d+$/;
    return rex.test(val)
  }
  
}
