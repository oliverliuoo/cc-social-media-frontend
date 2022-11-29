import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ReactiveFormsModule } from '@angular/forms';
import { NavtestComponent } from './navtest/navtest.component';
import {NgbNavModule} from '@ng-bootstrap/ng-bootstrap';
import { PostUploadComponent } from './post-upload/post-upload.component';
import { CardComponent } from './card/card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule} from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AllCardsComponent } from './all-cards/all-cards.component';
import { PostUploadDialogComponent } from './post-upload-dialog/post-upload-dialog.component';
import { AppRoutingModule } from './app-routing.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavtestComponent,
    PostUploadComponent,
    CardComponent,
    AllCardsComponent,
    PostUploadDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbNavModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MatDialogModule
  ],
  providers: [
    NavbarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


