import {Time} from '@angular/common';

export class Entry {
  Id : number;
  Date : Date;
  StartTime : string;
  EndTime : string;
  OutsideTime : string;
  Type : string;
  AllDay : boolean;
  UserId : string;
}
