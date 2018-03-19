import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EntryDialogComponent} from '../../Dialogs/entry-dialog/entry-dialog.component';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

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
