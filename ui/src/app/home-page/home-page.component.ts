import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import {HttpClient} from "@angular/common/http";
import {LoginServiceService} from "../login-page/log.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  userId: string;
  postDataList: Array<any> = [];
  postUrl: string;
  // postUrl = 'http://127.0.0.1:5000/post/hl3518/user';
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginServiceService) {
  }

  ngOnInit(): void {
    // check login first
    this.loginService.checkLogin().subscribe((rsp) => {
      // @ts-ignore
      let userData = rsp.user;
      if (userData !== null) {
        // cache user info
        localStorage.setItem('userId', userData.UserID);
        localStorage.setItem('userName', userData.Username);
        localStorage.setItem('userEmail', userData.Email);
        // has userData, login successfully
        this.userId = userData['UserID'];
        this.postUrl = 'http://social-media-post.us-east-2.elasticbeanstalk.com/post/' + this.userId + '/user';
        // fetch data from backend db
        this.http.get(this.postUrl).subscribe((rsp: any) => {
          for (const record of rsp.data) {
            this.postDataList.push(record);
          }
        });
      } else {
        // redirect to login page
        this.router.navigateByUrl('/login');
      }
    });
  }
}
