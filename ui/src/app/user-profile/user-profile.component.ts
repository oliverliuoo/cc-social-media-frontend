import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {appProperties} from "../app.config";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input('ngModel') userName: string;
  @Input('ngModel') userId: string;
  @Input('ngModel') email: string;
  logoutUrl = appProperties.userServiceEndPoint + 'logout';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
    this.email = localStorage.getItem('userEmail');
  }


  onLogOut(): void {
    this.http.get(this.logoutUrl).subscribe((rsp) => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userName');
      this.userId = '';
      this.userName = ''
      this.router.navigateByUrl('/login');
    })
  }
}
