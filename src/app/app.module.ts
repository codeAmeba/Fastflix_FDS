// Modules
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'

// Components
import { AppComponent } from './app.component'
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
  SliderComponent,
  CardComponent,
  DetailCardComponent,
  HeaderComponent,
  FooterComponent
} from './components'

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
  FixHeaderDirective,
  ProfileManageComponent
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent]
  })
export class AppModule {}
