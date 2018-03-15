import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  private apiUrl = 'https://homewalletapi.azurewebsites.net/api';  // URL to web api

  constructor() { }

  public GetEntryURL()
  {
    return this.apiUrl + "/entries/";
  }

}
