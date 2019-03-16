import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthGuard} from './guard/auth.guard';
import { AddContactComponent } from './add-contact/add-contact.component';
import { MessageComponent } from './message/message.component';
import { MailComponent } from './mail/mail.component';
import { GroupComponent } from './group/group.component';
import { FileComponent } from './file/file.component';
import {FileUploadModule} from 'ng2-file-upload';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    AddContactComponent,
    MessageComponent,
    MailComponent,
    GroupComponent,
    FileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    FlashMessagesModule,
    FileUploadModule,
    HttpClientModule
  ],
  providers: [FlashMessagesService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
