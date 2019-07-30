import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Main } from 'src/app/models/main';
import { MovieService } from 'src/app/services/movie.service';
import { HomeCategories } from 'src/app/models/HomeCategories';
import { MovieCategory } from 'src/app/models/movie-category';
import { MoviePreview } from 'src/app/models/movie-preview';

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
  homeCatogories: MovieCategory[];
  openedCategory: string;
  myLists: MoviePreview[];

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
      marked: false,
    };
    this.bigMovie = {
      id: 0,
      logo: '',
      title: '',
      image: '',
      degree: {},
      synopsis: '',
      marked: false,
    };
    this.homeCatogories = HomeCategories;
    this.openedCategory = '';
    this.getMainMovie();
    this.getMyListMovies();
  }

  getMainMovie() {
    this.movieService.getHomeMain().subscribe(mainMovie => {
      this.mainMovie.id = mainMovie[0]['메인 영화']['id'];
      this.mainMovie.image = mainMovie[0]['메인 영화']['big_image_path'];
      this.mainMovie.logo = mainMovie[0]['메인 영화']['logo_image_path'];
      this.mainMovie.title = mainMovie[0]['메인 영화']['name'];
      this.mainMovie.degree = mainMovie[0]['메인 영화']['degree'];
      this.mainMovie.synopsis = mainMovie[0]['메인 영화']['synopsis'];
      this.mainMovie.marked = mainMovie[0]['메인 영화']['marked'];
      this.getCategoryMovies();
    });

    this.movieService.getBigMovie().subscribe(bigMovie => {
      this.bigMovie.id = bigMovie['id'];
      this.bigMovie.image = bigMovie['big_image_path'];
      this.bigMovie.logo = bigMovie['logo_image_path'];
      this.bigMovie.title = bigMovie['name'];
      this.bigMovie.degree = bigMovie['degree'];
      this.bigMovie.synopsis = bigMovie['synopsis'];
      this.bigMovie.marked = bigMovie['marked'];
      console.log(bigMovie);
    });
  }

  toggleMyLsit(movie: Main) {
    this.movieService.myList(movie.id).subscribe(({ marked }) => {
      console.log(movie, marked);
      this.getMyListMovies();
      movie.marked = marked;
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

  getCategoryMovies() {
    this.getPopularMovies();
    this.getLatestMovies();
    this.getFollowUpMovies();
  }

  getPopularMovies() {
    const popularCategory = this.homeCatogories.find(
      ({ category }) => category === 'Fastflix 인기 콘텐츠'
    );

    this.movieService.getPopularMovies().subscribe(movies => {
      popularCategory.movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  getMyListMovies() {
    const myListCategory = this.homeCatogories.find(
      ({ category }) => category === '내가 찜한 콘텐츠'
    );
    this.movieService.getMyListMovies().subscribe(movies => {
      this.myLists = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
      myListCategory.movies = this.myLists;
      console.log('내가 찜한 목록', myListCategory.movies);
    });
  }

  getLatestMovies() {
    const latestCategory = this.homeCatogories.find(
      ({ category }) => category === '최신 등록 콘텐츠'
    );
    this.movieService.getLatestMovies().subscribe(movies => {
      latestCategory.movies = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
    });
  }

  getFollowUpMovies() {
    const follwUpCategory = this.homeCatogories.find(
      ({ category }) => category === '시청 중인 콘텐츠'
    );
    this.movieService.getFollowUpMovies().subscribe(
      movies => {
        follwUpCategory.movies = movies.map(movie => {
          return {
            id: movie.id,
            title: movie.name,
            url: movie['horizontal_image_path'],
            preview: movie['sample_video_file'],
          };
        });
      },
      error => console.error(error)
    );
  }

  // original API 미완
  getOriginalMovies() {
    const originalCategory = this.homeCatogories.find(
      ({ category }) => category === 'Fastflix 오리지널'
    );
    // this.movieService.getFollowUpMovies().subscribe(
    //   movies => {
    //     originalCategory.movies = movies.map(movie => {
    //       return {
    //         id: movie.id,
    //         title: movie.name,
    //         url: movie['horizontal_image_path'],
    //         preview: movie['sample_video_file'],
    //       };
    //     });
    //   },
    //   error => console.error(error)
    // );
  }
}
