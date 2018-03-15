import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  public setUserId(id:number)
  {
    localStorage.setItem('userId',id.toString());
  }

  public getUserId() :string
  {
    return localStorage.getItem('userId');
  }
}
