import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllCardsComponent} from './all-cards/all-cards.component';
import {LoginComponent} from "./login-page/login.component";
import {SignupComponent} from "./signup-page/signup.component";
import {TempComponent} from "./temp-page/temp.component";


const routes: Routes = [
  { path: 'all-posts/:user_id/users', component: AllCardsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'home', component: TempComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
