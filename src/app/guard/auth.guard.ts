import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {ImsserviceService} from '../imsservice.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private imsserv:ImsserviceService,
        private router:Router
    ){}

    canActivate(){
        if(this.imsserv.loggedIn()){
            return true;
        }else{
            this.router.navigate(['/home'])
            return false;
        }
    }
}