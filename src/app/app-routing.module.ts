import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthGuard} from './guard/auth.guard';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MessageComponent } from './message/message.component';
import { MailComponent } from './mail/mail.component';
import { GroupComponent } from './group/group.component';


const routes: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard],
   children:[{path:'',redirectTo:'/dashboard',pathMatch:'full'},
              { path:'addcontact',component:AddContactComponent,canActivate:[AuthGuard]},
              { path:'message',component:MessageComponent},
              { path:'mail',component:MailComponent},
              {path:'group',component:GroupComponent}] 
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
