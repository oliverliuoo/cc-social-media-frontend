import { Component, OnInit } from '@angular/core';

import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title: '';

  constructor(
    private formBuilder: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
  }

}
