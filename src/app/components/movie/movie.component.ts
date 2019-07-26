import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Main } from 'src/app/models/main';
import { MovieCategories } from 'src/app/models/movieCategories';
import { MoviePreview } from 'src/app/models/movie-preview';
import { MovieCategory } from 'src/app/models/movie-category';

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
  movieCategories: MovieCategory[];
  openedCategory: string;

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
    this.openedCategory = '';
    this.getMovies();
    this.movieCategories = MovieCategories;
  }

  getMovies() {
    this.movieService.getMainMovie().subscribe(
      movies => {
        this.movies = movies[0];
        // console.log('원본', this.movies);

        this.getMainMovie();
        this.movieCategories = this.movieCategories.map(previewCat => {
          // console.log(
          //   previewCat.category,
          //   this.getCategoryMovie(previewCat.category)
          // );

          return {
            category: previewCat.category,
            movies: this.getCategoryMovie(previewCat.category),
          };
        });
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

  getCategoryMovie(category: string): MoviePreview[] {
    return this.movies['장르별 영화리스트'][category].map(movie => {
      return {
        id: movie.id,
        title: movie.name,
        url: movie['horizontal_image_path'],
      };
    });
  }

  sliderOpened(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory = category;
    thanos.classList.add('has-open-jaw');
    console.log('opened', this.openedCategory);
  }

  sliderClosed(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory =
      this.openedCategory === category ? '' : this.openedCategory;

    thanos.classList.remove('has-open-jaw');

    console.log('closed', this.openedCategory);
  }
}
