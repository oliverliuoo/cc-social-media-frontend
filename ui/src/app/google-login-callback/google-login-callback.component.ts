import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginServiceService} from "../login-page/log.service";

@Component({
  selector: 'app-google-login-callback',
  templateUrl: './google-login-callback.component.html',
  styleUrls: ['./google-login-callback.component.css']
})
export class GoogleLoginCallbackComponent {

  @Input('ngModel') email: string;
  @Input('ngModel') userName: string;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginServiceService) {
  }

  ngOnInit(): void {
  }

  loginRedirect() {
    this.loginService.checkLogin().subscribe((rsp) => {
      // @ts-ignore
      let userData = rsp.user;
      if (userData !== null) {
        // cache user info
        localStorage.setItem('userId', userData.UserID);
        localStorage.setItem('userName', userData.Username);
        localStorage.setItem('userEmail', userData.Email);
        this.userName = userData.Username;
        this.email = userData.email;
        this.router.navigateByUrl('/home/' + userData.UserID);
      } else {
        // redirect to login page
        alert("Login failed, please try again.");
        this.router.navigateByUrl('/login');
      }
    });
  }

}
