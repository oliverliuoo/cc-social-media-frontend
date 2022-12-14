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
  Datalistshow:Array<Post> = [];
  logoutUrl = appProperties.userServiceEndPoint + 'logout';
  page:number;
  perPage: number;
  pages:Array<Object>;
  total_items=0;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router,
              private loginService: LoginServiceService) {
  }

  ngOnInit(): void {
    this.pages = [];
    this.page = 0;
    this.perPage =1;
    this.checkLogin();
    // Initialize the pages array

    // Calculate the total number of pages




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

        let feedGetByUserUrl = appProperties.postServiceEndPoint + 'post/' + this.userId + '/user';
        // fetch data from backend db
        this.http.get<PostRsp>(feedGetByUserUrl).subscribe((rsp: any) => {
          for (const record of rsp.data) {
            this.postDataList.push(record);
          }
          this.Datalistshow = this.postDataList.slice(0,this.perPage);
          this.total_items = this.postDataList.length;
          let totalPages = Math.ceil(this.total_items / this.perPage);
          // Generate the array of page numbers
          for (let i = 1; i <= totalPages; i++) {
            this.pages.push(i);
            console.log(this.pages)
          }
          //this.totalPages = Math.ceil( this.total_items / this.perPage);
          //this.pages = Array.from({length:this.totalPages},(value, index) => index + 1)
          //console.log(this.pages)
        });





      } else {
        // redirect to login page
        this.router.navigateByUrl('/login');
      }
    });
  }
  nextPage(): void{
    this.Datalistshow = this.postDataList.slice(this.page-1,(this.page-1)+this.perPage);
  }
}
