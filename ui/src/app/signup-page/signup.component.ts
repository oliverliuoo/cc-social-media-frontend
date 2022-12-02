import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { SignupServiceService } from './signup.service';
import {ColumbiaStudent} from './signup';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  toggleStudent: boolean;
  studentName: string;
  studentUni: string;
  signupService: SignupServiceService;
  studentsInfo: ColumbiaStudent[];
  // login
  email: string;
  username: string;
  password: string;
  change_username: string;
  change_email: string;
  message: string;

  constructor(signupService: SignupServiceService, private router: Router) {
    this.toggleStudent = false;
    this.studentName = undefined;
    this.studentUni = undefined;
    this.signupService = signupService;
    this.studentsInfo = undefined;
    // signup
    this.email = undefined;
    this.username =  undefined;
    this.password = undefined;
    this.change_username = undefined;
    this.change_email = undefined;
    this.message = undefined;
  }

  ngOnInit(): void {
  }

  changeUsername(data): void {
    if (data) {
      this.change_username = 'username is already used, change to another one.'
    }
  }

  changeEmail(data): void {
    console.log(data)
    if (data) {
      this.change_email = 'Email is already registered, log in or change to another one.'
    }
  }

  insertUser(): void {
    // check if input email has existed in database
    this.signupService.validEmail(this.email).subscribe((data) => this.changeEmail(data),
    ((err:Error)=>{
      // if not, check if input username has existed in database
      this.change_email = "";
      this.signupService.validUsername(this.username).subscribe((data) => this.changeUsername(data),
        (err:Error)=>{
          // if not, insert new user into database
          this.change_username = "";
          this.signupService.insertNewUser(this.email, this.username, this.password).subscribe((data) => {console.log(data)});
          // jump to login page
          this.router.navigateByUrl('/login').then(r => {
            console.log(r); // true if navigation is successful
          }, err => {
            console.log(err); // when there's an error
          });
        });
    }))
  }

  onSignUp(): void {
    // check all box are not empty
    if (this.email && this.username && this.password) {
      // insert new user
      this.message = "";
      this.insertUser();
    } else {
      this.message = "Fill in the blanks before sign up!";
    }
  }

  // signup process
//   this.signupService.validEmail(this.email).subscribe(
// (data) => this.changeEmail(data));
//   console.log(this.change_email);
//   if (this.username) {
//   // insert api??
//   // check valid username
//   console.log("here2")
//   this.signupService.validUsername(this.username).subscribe(
// (data) => this.changeUsername(data));

}
