import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {PostUploadComponent} from '../post-upload/post-upload.component';


@Component({
  selector: 'app-post-upload-dialog',
  templateUrl: './post-upload-dialog.component.html',
  styleUrls: ['./post-upload-dialog.component.css']
})
export class PostUploadDialogComponent implements OnInit {

  uploadDialog: MatDialogRef<PostUploadComponent>;

  constructor(private dialogModel: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog(): void {
    this.uploadDialog = this.dialogModel.open(PostUploadComponent, {
      width: '600px',
    });
  }
}
