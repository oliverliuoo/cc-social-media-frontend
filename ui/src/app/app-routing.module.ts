import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllCardsComponent} from './all-cards/all-cards.component';


const routes: Routes = [
  { path: 'all-posts', component: AllCardsComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
