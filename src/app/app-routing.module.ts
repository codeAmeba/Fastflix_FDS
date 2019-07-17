import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import {
  HomeComponent,
  MovieComponent,
  ProfileComponent,
  SignupComponent,
  LoginComponent,
  WatchComponent,
  IndexComponent,
  MyListComponent,
  ProfileManageComponent,
  SignupStep1Component,
  SignupStep2Component,
} from './components';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'welcome', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/manage', component: ProfileManageComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      /* UserComponent의 <router-outlet>에 표시 */
      { path: 'step1', component: SignupStep1Component },
      { path: 'step2', component: SignupStep2Component },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'mylist', component: MyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
