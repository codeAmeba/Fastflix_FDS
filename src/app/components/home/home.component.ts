import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Main } from 'src/app/models/main';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: string;
  playBillBoard: boolean;
  movies: object[];
  mainMovie: Main;
  bigMovie: Main;
  openedCategory: string;

  constructor(
    private authService: AuthenticationService,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.user = this.authService
      .getSubUsers()
      .find(({ id }) => id === +this.authService.getProfile()).name;

    this.playBillBoard = false;
    console.log('sub users', this.authService.getSubUsers());
    console.log('user', this.user);
    this.mainMovie = {
      id: 0,
      logo: '',
      title: '',
      image: '',
      degree: {},
      synopsis: '',
    };
    this.bigMovie = {
      id: 0,
      logo: '',
      title: '',
      image: '',
      degree: {},
      synopsis: '',
    };
    this.openedCategory = '';
    this.getMainMovie();
  }

  getMainMovie() {
    this.movieService.getHomeMain().subscribe(mainMovie => {
      console.log(mainMovie);
      this.mainMovie.id = mainMovie[0]['메인 영화']['id'];
      this.mainMovie.image = mainMovie[0]['메인 영화']['big_image_path'];
      this.mainMovie.logo = mainMovie[0]['메인 영화']['logo_image_path'];
      this.mainMovie.title = mainMovie[0]['메인 영화']['name'];
      this.mainMovie.degree = mainMovie[0]['메인 영화']['degree'];
      this.mainMovie.synopsis = mainMovie[0]['메인 영화']['synopsis'];
      console.log('mainMovie', this.mainMovie);
    });

    this.movieService.getBigMovie().subscribe(bigMovie => {
      console.log(bigMovie);
      this.bigMovie.id = bigMovie['id'];
      this.bigMovie.image = bigMovie['horizontal_image_path'];
      this.bigMovie.logo = bigMovie['logo_image_path'];
      this.bigMovie.title = bigMovie['name'];
      // this.bigMovie.degree = bigMovie[0]['메인 영화']['degree'];
      // this.bigMovie.synopsis = bigMovie[0]['메인 영화']['synopsis'];
      console.log('bigMovie', this.bigMovie);
    });
  }
}
