import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
import { AppComponent } from './app.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCheckboxModule, MatButtonModule, MatNativeDateModule, MatInputModule, MatSelectModule } from '@angular/material';
import { EntryDialogComponent } from './Dialogs/entry-dialog/entry-dialog.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApiService} from './Services/api.service';
import {EntryService} from './Services/entry.service';
import {UserService} from './Services/user.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './Components/register/register.component';
import {LoginComponent} from './Components/login/login.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { CalendarComponent } from './Components/calendar/calendar.component';
import {AuthGuard} from './auth.guard';

@NgModule({
  entryComponents:[
    EntryDialogComponent
  ],
  declarations: [
    AppComponent,
    EntryDialogComponent,
    RegisterComponent,
    LoginComponent,
    CalendarComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot(),
    BrowserModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    NgbModule.forRoot()
  ],
  providers: [
    ApiService,
    EntryService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
