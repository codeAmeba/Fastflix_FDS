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
  IndexComponent
} from './components'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'welcome', component: IndexComponent },
  { path: 'home', component: HomeComponent },
  { path: 'movie', component: MovieComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'watch', component: WatchComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule {}
