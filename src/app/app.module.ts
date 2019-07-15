// Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'

// Components
import { AppComponent } from './app.component'
import { HomeComponent } from './components/home/home.component'
import { MovieComponent } from './components/movie/movie.component'
import { SignupComponent } from './components/signup/signup.component'
import { LoginComponent } from './components/login/login.component'
import { ProfileComponent } from './components/profile/profile.component'
import { SliderComponent } from './components/slider/slider.component'
import { WatchComponent } from './components/watch/watch.component'
import { CardComponent } from './components/card/card.component'
import { DetailCardComponent } from './components/detail-card/detail-card.component'
import { IndexComponent } from './components/index/index.component'
import { HeaderComponent } from './components/header/header.component'
import { FooterComponent } from './components/footer/footer.component'
import { MyListComponent } from './components/my-list/my-list.component'

// Directives
import { FixHeaderDirective } from './directives/fix-header.directive'

@NgModule({
  declarations: [
  AppComponent,
  HomeComponent,
  MovieComponent,
  SignupComponent,
  LoginComponent,
  ProfileComponent,
  SliderComponent,
  WatchComponent,
  CardComponent,
  DetailCardComponent,
  IndexComponent,
  HeaderComponent,
  FooterComponent,
  MyListComponent,
  FixHeaderDirective
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
  })
export class AppModule {}
