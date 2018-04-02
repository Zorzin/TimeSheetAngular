import { Injectable } from '@angular/core';
import {Time} from '@angular/common';
import {Entry} from '../Models/entry';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import {UserService} from './user.service';

@Injectable()
export class EntryService {

  private headers;

  constructor(private http: HttpClient,
              private apiSerive: ApiService,
              private userService: UserService) { }

  private AddTokenToHeaders()
  {
    let authToken = localStorage.getItem('auth_token');
    this.headers = new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', `Bearer ${authToken}`);
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

  public GetEntryForDate(date: Date)
  {
    this.AddTokenToHeaders();
    return this.http.get(this.apiSerive.GetEntryByDateURL() + "/" + this.userService.getUserId() + "/" + date.toDateString(), {headers:this.headers}).toPromise();
  }

  public GetEntriesForDates(startDate: Date, endDate: Date)
  {
    this.AddTokenToHeaders();
    return this.http.get(this.apiSerive.GetEntryURL() + "/" + this.userService.getUserId() + "/" + startDate.toDateString() + "/" + endDate.toDateString(), {headers:this.headers}).toPromise();
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
    return this.http.put(this.apiSerive.GetEntryURL() + "/" + entry.id,body,{headers:this.headers,responseType: 'text' })
      .toPromise();
  }

  private CreateEntry(id: number, allDay: boolean, startTime, endTime, date: Date, outsiteTime, type: string) {
    let entry = new Entry();
    entry.id = id;
    entry.allDay = allDay;
    entry.startTime = this.GetTimeStringFromTime(startTime);
    entry.endTime = this.GetTimeStringFromTime(endTime);
    entry.date = date.GetDateWithoutTime();
    entry.outsideTime = this.GetTimeStringFromTime(outsiteTime);
    entry.type = type;
    entry.userId = this.userService.getUserId();
    return entry;
  }

  private GetTimeStringFromTime(time) {
    return time.hour + ":" + time.minute + ":0";
  }
}
