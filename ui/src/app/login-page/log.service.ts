import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './log';
import { UserRsp } from "./log";
import { Observable } from 'rxjs';
import {appProperties} from "../app.config";

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
  loginUrl = appProperties.userServiceEndPoint + 'login';
  googleLoginUrl = appProperties.userServiceEndPoint + 'google_login';

  constructor(private http: HttpClient) {
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
