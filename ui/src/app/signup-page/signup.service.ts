import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {ColumbiaStudent, User} from './signup';
import { ColumbiaStudentRsp } from "./signup";
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {

  students: ColumbiaStudent[];

  constructor(private http: HttpClient) {
    // console.log('The URL = ' + window.location.href);
    this.students = undefined;
  }

  getSignupUsernameServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    } else {
      result = 'https://127.0.0.1:5011/has-user/';
    }
    return result;
  }

  /** GET heroes from the server */
  // getStudents(studentUni): Observable<ColumbiaStudent> {
  //   let theUrl: string;
  //
  //   theUrl = this.getSignupServiceUrl() + studentUni;
  //   return this.http.get<ColumbiaStudent>(theUrl);
  // }

  validUsername(username): Observable<string> {
    let theUrl: string;

    theUrl = this.getSignupUsernameServiceUrl() + username;
    const result = this.http.get(theUrl, {responseType: 'text'});
    return result;
  }

  getSignupEmailServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'https://127.0.0.1:5011/has-email/';
    }
    return result;
  }

  validEmail(email): Observable<string> {
    let theUrl: string;

    theUrl = this.getSignupEmailServiceUrl() + email;
    const result = this.http.get(theUrl, {responseType: 'text'});
    console.log(JSON.stringify(result));
    return result;
  }

  getInsertNewServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'https://127.0.0.1:5011/new';
    }
    return result;
  }


  insertNewUser(email, username, password): Observable<any> {
    console.log("insert here")
    let theUrl: string;

    theUrl = this.getInsertNewServiceUrl();
    console.log(theUrl);
    const result = this.http.post(theUrl, {'username': username, 'email': email, 'password': password});
    // console.log(JSON.stringify(result));
    // return result;
    return result;
  }


  getEmailValidationServiceUrl(): string {
    const theUrl = window.location.href;
    let result: string;

    // This is some seriously bad code.
    // If you do this on a job interview, you did not learn this in my class.
    if (theUrl.includes('amazonaws')) {
      /* This can change over time */
      result = undefined;
    }
    else {
      result = 'https://127.0.0.1:5011/validate_email';
    }
    return result;
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
