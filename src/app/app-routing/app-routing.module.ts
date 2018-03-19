import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from '../Components/register/register.component';
import {LoginComponent} from '../Components/login/login.component';
import {CalendarComponent} from '../Components/calendar/calendar.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'calendar', component: CalendarComponent},
]


@NgModule({
  imports: [ RouterModule.forRoot(routes),RouterModule.forChild([ ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
