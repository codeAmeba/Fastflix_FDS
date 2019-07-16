import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

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
  ProfileManageComponent
} from './components'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'welcome', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/manage', component: ProfileManageComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'watch', component: WatchComponent },
  { path: 'mylist', component: MyListComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule {}
