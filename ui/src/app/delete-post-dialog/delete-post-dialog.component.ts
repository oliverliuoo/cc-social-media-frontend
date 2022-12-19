import {Component, Inject, Input} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {appProperties} from "../app.config";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-post-dialog',
  templateUrl: './delete-post-dialog.component.html',
  styleUrls: ['./delete-post-dialog.component.css']
})
export class DeletePostDialogComponent {

  constructor(private dialogRef: MatDialogRef<DeletePostDialogComponent>,
              private http: HttpClient,
              @Inject(MAT_DIALOG_DATA) public data: {postId: string},
              private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  onConfirmDelete(): void {
    let deleteUrl = appProperties.postServiceEndPoint + 'post/' + this.data.postId;
    this.http.delete(deleteUrl).subscribe((rsp) => {
      window.location.reload();
      this.dialogRef.close();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
