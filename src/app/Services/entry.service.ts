import { Injectable } from '@angular/core';
import {Time} from '@angular/common';
import {Entry} from '../Models/entry';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {UserService} from './user.service';

@Injectable()
export class EntryService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private apiSerive: ApiService,
              private userService: UserService) { }

  public SaveEntry(startTime, endTime, date:Date, outsiteTime, type:string,allDay:boolean)
  {
      let entry = new Entry();
      entry.AllDay = allDay;
      entry.StartTime = this.GetTimeStringFromTime(startTime);
      entry.EndTime = this.GetTimeStringFromTime(endTime);
      entry.Date = this.GetDateWithOffset(date);
      entry.OutsideTime = this.GetTimeStringFromTime(outsiteTime);
      entry.Type = type;
      entry.UserId = this.userService.getUserId();

      this.SendEntryToAPI(entry);
  }

  private SendEntryToAPI(entry:Entry)
  {
    let authToken = localStorage.getItem('auth_token');
    this.headers.append('Authorization', `Bearer ${authToken}`);

    let body = JSON.stringify(entry);
    console.log(body);
    this.http.post(this.apiSerive.GetEntryURL(),body,{headers:this.headers,responseType: 'text' })
      .subscribe();
  }

  private GetDateWithOffset(date :Date)
  {
    let offset = date.getTimezoneOffset()*60000;
    let newDate = new Date(date);
    newDate.setTime(newDate.getTime()-offset);
    return newDate;
  }

  private GetTimeStringFromTime(time) {
    return time.hour + ":" + time.minute + ":0";
  }
}
