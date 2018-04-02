import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  private apiUrl = 'http://localhost:5000/api/';  // URL to web api

  constructor() { }

  public GetEntryURL()
  {
    return this.apiUrl + "entries";
  }


  public GetEntryByDateURL()
  {
    return this.apiUrl + "entries/date";
  }

  public GetAccountsURL()
  {
    return this.apiUrl + "accounts";
  }

  GetLoginURL() {
    return this.apiUrl + "auth/login";
  }
}
