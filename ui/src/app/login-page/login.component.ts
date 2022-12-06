import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { LoginServiceService } from './log.service';
import {User} from './log';
import {Router} from '@angular/router';
import {NavigationExtras} from '@angular/router';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginService: LoginServiceService;
  studentsInfo: User[];
  // login
  userid: string;
  password: string;
  message: string;

  constructor(loginService: LoginServiceService,
              private router: Router,
              private cookieService: CookieService) {
    this.loginService = loginService;
    this.studentsInfo = undefined;
    // login
    this.userid =  undefined;
    this.password = undefined;
    this.message = undefined;
  }


  ngOnInit(): void {
  }

  // setStudentInfo(theStudent: User): void {
  //   console.log('Students = \n' + JSON.stringify(theStudent, null, 2));
  //   this.studentsInfo = [theStudent];
  // }

  setMessage(OutMessage: User): void {
    console.log('setting message');
    console.log(this.password);
    // change to secure method
    if (OutMessage.Password === this.password) {
      // store userId in cookie
      localStorage.setItem('userId', OutMessage.UserID)
      // jump to the home page
      this.router.navigateByUrl('/home/' + OutMessage.UserID).then(r => {
        console.log(r); // true if navigation is successful
      }, err => {
        console.log(err); // when there's an error
      });
    }
    else {
      this.message = 'wrong password, try again';
    }
  }

  // login button
  onLogin(): void {
    // use user api: http://18.221.129.134:5011/users/<userid>
    // to get password
    if (this.userid && this.password) {
      // use userid or email
      // userid
      this.loginService.getUser(this.userid)
        .subscribe((data) => this.setMessage(data));
      // need another api .../users/<email> to get password by email
    }
  }

  onGoogleLogin(): void {
    this.loginService.googleLogin().subscribe((data) => {console.log(data)});
  }


}
