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
  MyListComponent
} from './components'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'welcome', component: IndexComponent, data: { animation: 'main' } },
  { path: 'home', component: HomeComponent, data: { animation: 'main' } },
  { path: 'movie', component: MovieComponent, data: { animation: 'main' } },
  { path: 'profile', component: ProfileComponent, data: { animation: 'main' } },
  { path: 'signup', component: SignupComponent, data: { animation: 'main' } },
  { path: 'login', component: LoginComponent, data: { animation: 'main' } },
  { path: 'watch', component: WatchComponent, data: { animation: 'main' } },
  { path: 'mylist', component: MyListComponent, data: { animation: 'main' } }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  })
export class AppRoutingModule {}
