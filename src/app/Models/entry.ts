import {Time} from '@angular/common';

export class Entry {
  Date : Date;
  StartTime : Time;
  EndTime : Time;
  OutsideTime : Time;
  Id : number;
  Type : string;
  AllDay : boolean;
}
