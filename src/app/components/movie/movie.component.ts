import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Main } from 'src/app/models/main';
import { MovieCategories } from 'src/app/models/movieCategories';
import { MoviePreview } from 'src/app/models/movie-preview';
import { MovieCategory } from 'src/app/models/movie-category';
import { Router, NavigationEnd } from '@angular/router';
import { SubUser } from 'src/app/models/sub-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MovieGenres } from 'src/app/models/movieGenres';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit, OnDestroy {
  playBillBoard: boolean;
  movies: object[];
  mainMovie: Main;
  movieCategories: MovieCategory[];
  genreCatogories: MovieCategory[];
  openedCategory: string;
  myLists: MoviePreview[];
  navigationSubscription;
  subUser: SubUser;
  genre: string;

  constructor(
    private renderer: Renderer2,
    private movieService: MovieService,
    private router: Router,
    private authService: AuthenticationService
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        if (this.subUser && this.subUser.id !== authService.subUser.id)
          this.init();
        if (this.genre !== movieService.Genre) {
          console.log('!!!!!!!!!', this.genre, movieService.Genre);
          this.filterByMovies();
        }
      }
    });
  }

  ngOnInit() {
    this.renderer.addClass(document.body.parentElement, 'movie');
    this.renderer.addClass(document.body, 'movie');
    this.playBillBoard = false;
    this.init();
  }

  init() {
    this.subUser = this.authService.subUser;
    this.genre = this.movieService.Genre;
    this.openedCategory = '';
    this.getMovies();
  }

  filterByMovies() {
    this.genre = this.movieService.Genre;
    this.genreCatogories = MovieGenres;
    this.movieService.getGenreMovieList().subscribe(movies => {
      console.log(movies);

      this.genreCatogories.forEach(genreCategory => {
        genreCategory.movies = movies[genreCategory.category]
          ? movies[genreCategory.category].map(movie => {
              return {
                id: movie.id,
                title: movie.name,
                url: movie['horizontal_image_path'],
                preview: movie['sample_video_file'],
              };
            })
          : [];
      });
      console.log(this.genreCatogories);
    });
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
        };
        return preMovie;
      });
      this.getMainMovie();
      this.movieCategories = MovieCategories.map(previewCat => {
        return {
          category: previewCat.category,
          movies: this.getCategoryMovie(previewCat.category),
        };
      });
      this.getOriginalMovies();
    });
  }

  getMainMovie() {
    this.mainMovie = {
      id: this.movies['메인 영화']['id'],
      image: this.movies['메인 영화']['big_image_path'],
      logo: this.movies['메인 영화']['logo_image_path'],
      title: this.movies['메인 영화']['name'],
      degree: this.movies['메인 영화']['degree'],
      synopsis: this.movies['메인 영화']['synopsis'],
      marked: this.movies['메인 영화']['marked'],
    };
  }

  getCategoryMovie(category: string): MoviePreview[] {
    return this.movies['장르별 영화리스트'][category].map(movie => {
      return {
        id: movie.id,
        title: movie.name,
        url: movie['horizontal_image_path'],
        preview: movie['sample_video_file'],
      };
    });
  }

  getOriginalMovies() {
    this.movieService.getMovieByGenre('넷플릭스 오리지널').subscribe(movies => {
      this.movieCategories.find(
        ({ category }) => category === '오리지널'
      ).movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          tallUrl: movie['original_vertical_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  sliderOpened(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory = category;
    thanos.classList.add('has-open-jaw');
  }

  sliderClosed(category: string) {
    const thanos = document.querySelector('.thanos');

    this.openedCategory =
      this.openedCategory === category ? '' : this.openedCategory;

    thanos.classList.remove('has-open-jaw');
  }

  toggleMyLsit(movie: Main) {
    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      movie.marked = marked;
      this.getMyListMovies();
      this.movieService.getMyListMovies().subscribe(myLists => {
        this.mainMovie.marked = myLists.find(
          ({ id }) => id === this.mainMovie.id
        );
      });
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body.parentElement, 'movie');
    this.renderer.removeClass(document.body, 'movie');
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
