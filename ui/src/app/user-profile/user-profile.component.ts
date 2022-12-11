import {Component, Input} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  @Input('ngModel') userName: string;
  userId: string;
  logoutUrl = 'https://127.0.0.1:5011/logout';

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.userName = localStorage.getItem('userName');
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