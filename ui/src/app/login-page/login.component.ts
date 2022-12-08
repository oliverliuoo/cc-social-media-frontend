import {Component, Inject, OnInit} from '@angular/core';
import { DOCUMENT } from "@angular/common";
import { LoginServiceService } from './log.service';
import {User} from './log';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  loginService: LoginServiceService;
  studentsInfo: User[];
  // login
  email: string;
  password: string;
  message: string;

  constructor(loginService: LoginServiceService,
              private router: Router,
              @Inject(DOCUMENT) private document: Document) {
    this.loginService = loginService;
    this.studentsInfo = undefined;
    // login
    this.email =  undefined;
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

  handleLoginResponse(rsp): void {
    let userData = rsp.data;
    let msg = rsp.msg;
    if (userData === null) {
      // login unsuccessful
      this.message = msg;
    } else {
      // store user info in localStorage
      localStorage.setItem('userId', userData.UserID);
      localStorage.setItem('userName', userData.Username);
      localStorage.setItem('userEmail', userData.Email);
      // jump to the home page
      this.router.navigateByUrl('/home/' + userData.UserID);
    }
  }

  handleGoogleLoginResponse(rsp): void {
    console.log(rsp);
    this.goToUrl(rsp.redirect_uri);
  }


  // login button
  onLogin(): void {
    // use user api: http://18.221.129.134:5011/users/<userid>
    let postData = {
      'email': this.email,
      'password': this.password
    }
    // login
    this.loginService.login(postData).subscribe(
      (rsp) => {
        this.handleLoginResponse(rsp);
      }
    )
  }

  onGoogleLogin(): void {
    this.loginService.googleLogin().subscribe((rsp) => {
      this.handleGoogleLoginResponse(rsp);
    });
  }

  goToUrl(url: string): void {
    this.document.location.href = url;
  }

}
