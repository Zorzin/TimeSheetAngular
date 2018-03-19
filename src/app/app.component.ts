import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import {EntryDialogComponent} from './Dialogs/entry-dialog/entry-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(){}

  ngOnInit(): void {
  }
}
