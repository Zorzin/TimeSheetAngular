import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material';
import {EntryDialogComponent} from '../../Dialogs/entry-dialog/entry-dialog.component';
import {CalendarEvent} from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import {map} from 'rxjs/operators';
import {HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Entry} from '../../Models/entry';
import {colors} from '../../Helpers/colors';
import {EntryService} from '../../Services/entry.service';
import {pipe} from 'rxjs/util/pipe';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Input() locale: string = 'en';
  @Output() viewChange: EventEmitter<string> = new EventEmitter();
  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

  events$: Observable<Array<CalendarEvent<{ entry: Entry }>>>;
  width: number;
  height:number;
  view: string = 'month';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  clickedDate: Date;

  constructor(
    private entryService: EntryService,
    public dialog: MatDialog){}

  ngOnInit(): void {
    this.GetWidthAndHeight();
    this.fetchEvents();
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

  private fetchEvents() {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];
    this.entryService.GetEntriesForDates(getStart(this.viewDate),getEnd(this.viewDate))
      .then( (results) =>
      {
        this.events = this.GetEvents(results);
      });

  }

  private GetEvents(results) {
    return results.map((entry: Entry) => {
      return {
        title: entry.startTime + " - " + entry.endTime,
        start: new Date(entry.date),
        color: colors.yellow,
        meta: {
          entry
        }
      };
    });
  }
}
