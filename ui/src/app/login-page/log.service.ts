import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './log';
import { UserRsp } from "./log";
import { Observable } from 'rxjs';

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'charset': 'UTF-8',

  })
};


@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  students: User[];
  studentServiceUrl: string;
  loginUrl= "https://127.0.0.1:5011/login";
  googleLoginUrl = "https://127.0.0.1:5011/google_login";

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

  /** Normal Login in */
  login(postData): Observable<Object> {
    return this.http.post(this.loginUrl, postData, httpOptions);
  }

  googleLogin(): Observable<Object> {
    return this.http.get(this.googleLoginUrl, httpOptions);
  }

  /** Check current login status and cache user info. */
  checkLogin(): Observable<Object> {
    return this.http.get(this.loginUrl, httpOptions);
  }
}
