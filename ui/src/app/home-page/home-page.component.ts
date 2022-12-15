import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {HttpClient} from "@angular/common/http";
import {LoginServiceService} from "../login-page/log.service";
import { Post, PostRsp } from "../post-page/post";
import {appProperties} from "../app.config";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  userId: string;
  postDataList: Array<Post> = [];
  logoutUrl = appProperties.userServiceEndPoint + 'logout';

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginServiceService) {
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin() {
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
        let feedGetByUserUrl = appProperties.feedServiceEndPoint + '/feed/' + this.userId;
        console.log(feedGetByUserUrl);
        // fetch data from backend db
        this.http.get<PostRsp>(feedGetByUserUrl).subscribe((rsp: any) => {
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
