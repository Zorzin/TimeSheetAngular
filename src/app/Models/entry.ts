import {Time} from '@angular/common';

export class Entry {
  id : number;
  date : Date;
  startTime : string;
  endTime : string;
  outsideTime : string;
  type : string;
  allDay : boolean;
  userId : string;
}
