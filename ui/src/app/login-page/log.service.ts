import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './log';
import { UserRsp } from "./log";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  students: User[];
  studentServiceUrl: string;

  constructor(private http: HttpClient) {
    // console.log('The URL = ' + window.location.href);
    this.students = undefined;
  }

  getLoginServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'http://127.0.0.1:5011/check_login/';
    }
    return result;
  }


  /** GET heroes from the server */
  getUser(userID): Observable<User> {
    let theUrl: string;

    theUrl = this.getLoginServiceUrl() + userID;
    return this.http.get<User>(theUrl);
  }

  // sending password???
  // checkPassword(userID, password): boolean {
  //   let theUrl: string;
  //
  //   // theUrl = this.getLoginServiceUrl() + userID + "/" + password
  // }

  googleLogin(): Observable<Object> {
    return this.http.get('http://127.0.0.1:5011/login');
  }
}
