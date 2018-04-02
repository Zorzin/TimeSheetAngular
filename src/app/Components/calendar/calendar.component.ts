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
import {Observable} from 'rxjs/Observable';
import {Entry} from '../../Models/entry';
import {colors} from '../../Helpers/colors';
import {EntryService} from '../../Services/entry.service';
import {EntryDialogType} from '../../Helpers/entry-dialog-type.enum';

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
    this.OpenDialog(this.clickedDate);
  }

  private OpenDialog(clickedDate: Date){
    let entry;
    this.entryService.GetEntryForDate(clickedDate).then((response : Entry) => {
      console.log(response);
      entry = response;
    }).then(()=>{
      console.log(entry);
      this.dialog.open(EntryDialogComponent,{
        data: {dateValue:this.clickedDate, dialogType:entry!=null?EntryDialogType.Update:EntryDialogType.New, entry: entry}
      });
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
