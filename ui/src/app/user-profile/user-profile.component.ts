import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {appProperties} from "../app.config";
import { EditUsernameService } from './rename.service';

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
              private router: Router,
              private editService: EditUsernameService) {
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

  onRename(): void {
    const edit = document.getElementById('edit')
    edit.style.display = 'none';

    const rename = document.getElementById('rename')
    rename.style.display = 'flex';
  }

  onCancelRename(): void {
    const edit = document.getElementById('edit')
    edit.style.display = 'inline';

    const rename = document.getElementById('rename')
    rename.style.display = 'none';
  }

  onSubmit(): void {
    let newName : string = (<HTMLInputElement>document.getElementById("fname")).value;
    console.log("new name is " + newName)
    this.editService.editUsername(this.userId, newName).subscribe((data) => {
      console.log(data)
      localStorage.setItem('userName', newName);
      this.userName = newName;
      this.ngOnInit(); // reinitialize username
      window.location.reload();
    });
  }
}
