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

  private AddTokenToHeaders()
  {
    if(!this.headers.has("Authorization"))
    {
      let authToken = localStorage.getItem('auth_token');
      this.headers.append('Authorization', `Bearer ${authToken}`);
    }
  }

  public SaveEntry(startTime, endTime, date:Date, outsiteTime, type:string,allDay:boolean)
  {
    let entry = this.CreateEntry(-1, allDay, startTime, endTime, date, outsiteTime, type);
    return this.SendEntryToAPI(entry);
  }

  public EditEntry(id:number, startTime, endTime, date:Date, outsiteTime, type:string,allDay:boolean)
  {
    let entry = this.CreateEntry(id, allDay, startTime, endTime, date, outsiteTime, type);
    return this.SendEditToAPI(entry);
  }

  public GetEntryById(id: number)
  {
    this.AddTokenToHeaders();
    return this.http.get(this.apiSerive.GetEntryURL() + "/" + id).toPromise();
  }

  public GetEntriesForDates(startDate: Date, endDate: Date)
  {
    this.AddTokenToHeaders();
    return this.http.get(this.apiSerive.GetEntryURL() + "/" + startDate + "/" + endDate)
      .toPromise();
  }

  private SendEntryToAPI(entry:Entry)
  {
    this.AddTokenToHeaders();

    let body = JSON.stringify(entry);
    console.log(body);
    return this.http.post(this.apiSerive.GetEntryURL(),body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  private SendEditToAPI(entry: Entry) {
    this.AddTokenToHeaders();

    let body = JSON.stringify(entry);
    console.log(body);
    return this.http.put(this.apiSerive.GetEntryURL() + "/" + entry.Id,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  private CreateEntry(id: number, allDay: boolean, startTime, endTime, date: Date, outsiteTime, type: string) {
    let entry = new Entry();
    entry.Id = id;
    entry.AllDay = allDay;
    entry.StartTime = this.GetTimeStringFromTime(startTime);
    entry.EndTime = this.GetTimeStringFromTime(endTime);
    entry.Date = this.GetDateWithOffset(date);
    entry.OutsideTime = this.GetTimeStringFromTime(outsiteTime);
    entry.Type = type;
    entry.UserId = this.userService.getUserId();
    return entry;
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
