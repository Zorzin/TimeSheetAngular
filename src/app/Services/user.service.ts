import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiService} from './api.service';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class UserService {

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();
  private loggedIn = false;
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
    private apiService : ApiService) {

    this.loggedIn = !!localStorage.getItem('auth_token');
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
  }

  public setUserId(id:number)
  {
    localStorage.setItem('userId',id.toString());
  }

  public getUserId() :string
  {
    try{
      return localStorage.getItem('userId');
    }
    catch(Error) {
      return "asd";
    }
  }

  register(email: string, password: string, firstName: string, lastName: string,location: string)
  {
    let body = JSON.stringify({ email, password, firstName, lastName,location });

    return this.http.post(this.apiService.GetAccountsURL() + "", body, {headers:this.headers});
  }

  login(userName, password) {
    return this.http.post<LoginResponse>(
        this.apiService.GetLoginURL(), JSON.stringify({ userName, password }),{ headers:this.headers }
      )
      .toPromise()
      .then(res => {
        console.log(res);
        localStorage.setItem('auth_token', res.auth_token);
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        return true;
      });
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

interface LoginResponse {
  id: number;
  auth_token: string;
  expires_in: string;
}
