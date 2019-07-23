import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Main } from 'src/app/models/main';
import { MovieCategory } from 'src/app/models/movieCategories';
import { MoviePreview } from 'src/app/models/movie-preview';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  user: string;
  playBillBoard: boolean;
  movies: object[];
  mainMovie: Main;
  movieCategory: string[];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.user = '사용자';
    this.playBillBoard = false;
    this.mainMovie = {
      id: 0,
      logo: '',
      title: '',
      image: '',
      degree: '',
      synopsis: '',
    };

    this.getMovies();
    this.movieCategory = MovieCategory;
  }

  getMovies() {
    this.movieService.getMainMovie().subscribe(
      movies => {
        this.movies = movies[0];
        this.getMainMovie();
      },
      error => {
        console.log(error);
      }
    );
  }

  getMainMovie() {
    this.mainMovie.id = this.movies['메인 영화']['id'];
    this.mainMovie.image = this.movies['메인 영화']['big_image_path'];
    this.mainMovie.logo = this.movies['메인 영화']['logo_image_path'];
    this.mainMovie.title = this.movies['메인 영화']['name'];
    this.mainMovie.degree = this.movies['메인 영화']['degree'].id;
    this.mainMovie.synopsis = this.movies['메인 영화']['synopsis'];
  }

  getCategoryMovie(sliderCategory: string): MoviePreview[] {
    // console.log(
    //   sliderCategory,
    //   this.movies['장르별 영화리스트'][sliderCategory]
    // );

    return this.movies['장르별 영화리스트'][sliderCategory].map(movie => {
      return {
        id: movie.id,
        title: movie.name,
        url: movie['horizontal_image_path'],
      };
    });
  }
}
