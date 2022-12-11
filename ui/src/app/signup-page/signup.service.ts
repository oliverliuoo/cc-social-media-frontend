import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ColumbiaStudent, User} from './signup';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import {appProperties} from "../app.config";


@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  students: ColumbiaStudent[];

  constructor(private http: HttpClient) {
  }

  getSignupUsernameServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'has-user/';
  }

  validUsername(username): Observable<string> {
    let theUrl: string;

    theUrl = this.getSignupUsernameServiceUrl() + username;
    return this.http.get(theUrl, {responseType: 'text'});
  }

  getSignupEmailServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'has-email/';
  }

  validEmail(email): Observable<string> {
    let theUrl: string;

    theUrl = this.getSignupEmailServiceUrl() + email;
    const result = this.http.get(theUrl, {responseType: 'text'});
    console.log(JSON.stringify(result));
    return result;
  }

  getInsertNewServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'new';
  }


  insertNewUser(email, username, password): Observable<any> {
    let theUrl: string;

    theUrl = this.getInsertNewServiceUrl();
    return this.http.post(theUrl, {'username': username, 'email': email, 'password': password});
  }


  getEmailValidationServiceUrl(): string {
    return appProperties.userServiceEndPoint + 'validate_email';
  }

  apiValidateEmail(email): Observable<any> {
    console.log("check validation")
    let theUrl: string;

    theUrl = this.getEmailValidationServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'email': email});
    console.log(JSON.stringify(result));
    // return result;
    return result;
  }

}
