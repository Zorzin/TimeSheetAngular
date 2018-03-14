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

  @Input() locale: string = 'en';
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  width: number;
  height:number;
  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  clickedDate: Date;

  constructor(
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.GetWidthAndHeight();
  }

  OnDayClicked(date :Date) {
      this.clickedDate = date;
    let dialogRef = this.dialog.open(EntryDialogComponent,{
      data: {dateValue:this.clickedDate}
    });

  }


  private GetWidthAndHeight() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
