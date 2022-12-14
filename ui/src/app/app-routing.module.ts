import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllCardsComponent} from './all-cards/all-cards.component';
import {LoginComponent} from "./login-page/login.component";
import {SignupComponent} from "./signup-page/signup.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {FollowersComponent} from './followers/followers.component';
import {FollowingsComponent} from './followings/followings.component';
import {GoogleLoginCallbackComponent} from "./google-login-callback/google-login-callback.component";

import {PostPageComponent} from "./post-page/post-page.component";

const routes: Routes = [
  { path: 'all-posts/:user_id', component: AllCardsComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', redirectTo: '/login', pathMatch: 'full' },
  { path: 'all-posts', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home/:user_id', component: HomePageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login/callback', component: GoogleLoginCallbackComponent},
  { path: 'followers', component: FollowersComponent },
  { path: 'followings', component: FollowingsComponent },
  { path: 'post-page/:post_id', component: PostPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
