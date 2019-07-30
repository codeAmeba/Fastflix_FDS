import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
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
export class MovieComponent implements OnInit, OnDestroy {
  user: string;
  playBillBoard: boolean;
  movies: object[];
  mainMovie: Main;
  movieCategories: MovieCategory[];
  openedCategory: string;
  myLists: MoviePreview[];

  constructor(
    private renderer: Renderer2,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.body.parentElement, 'movie');
    this.renderer.addClass(document.body, 'movie');

    this.user = '사용자';
    this.playBillBoard = false;
    this.mainMovie = {
      id: 0,
      logo: '',
      title: '',
      image: '',
      degree: {},
      synopsis: '',
      marked: false,
    };
    this.openedCategory = '';
    this.getMovies();
    this.movieCategories = MovieCategories;
  }

  getMovies() {
    this.movieService.getMainMovie().subscribe(
      movies => {
        this.movies = movies[0];
        this.getMyListMovies();
      },
      error => {
        console.log(error);
      }
    );
  }

  getMyListMovies() {
    this.movieService.getMyListMovies().subscribe(movies => {
      this.myLists = movies.map(movie => {
        const preMovie: MoviePreview = {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
          marked: true,
        };
        return preMovie;
      });
      this.getMainMovie();
      this.movieCategories = this.movieCategories.map(previewCat => {
        return {
          category: previewCat.category,
          movies: this.getCategoryMovie(previewCat.category),
        };
      });
      console.log('내가 찜한 목록', this.myLists);
    });
  }

  getMainMovie() {
    this.mainMovie.id = this.movies['메인 영화']['id'];
    this.mainMovie.image = this.movies['메인 영화']['big_image_path'];
    this.mainMovie.logo = this.movies['메인 영화']['logo_image_path'];
    this.mainMovie.title = this.movies['메인 영화']['name'];
    this.mainMovie.degree = this.movies['메인 영화']['degree'];
    this.mainMovie.synopsis = this.movies['메인 영화']['synopsis'];
    this.mainMovie.marked = this.myLists.find(
      ({ id }) => id === this.mainMovie.id
    )
      ? true
      : false;
  }

  getCategoryMovie(category: string): MoviePreview[] {
    return this.movies['장르별 영화리스트'][category].map(movie => {
      return {
        id: movie.id,
        title: movie.name,
        url: movie['horizontal_image_path'],
        preview: movie['sample_video_file'],
        marked: this.myLists.find(({ id }) => id === movie.id) ? true : false,
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

  toggleMyLsit(id: number) {
    this.movieService.myList(id).subscribe(response => console.log(response));
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body.parentElement, 'movie');
    this.renderer.removeClass(document.body, 'movie');
  }
}
