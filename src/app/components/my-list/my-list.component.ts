import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { MoviePreview } from 'src/app/models/movie-preview';
import { NavigationEnd, Router } from '@angular/router';
import { SubUser } from 'src/app/models/sub-user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css'],
})
export class MyListComponent implements OnInit, OnDestroy {
  myLists: MoviePreview[];
  sliderNums: number;
  sliderLines: MoviePreview[][];
  openedCategory: string;
  subUser: SubUser;
  navigationSubscription;

  constructor(
    private movieService: MovieService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        if (this.subUser !== authService.subUser) this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.subUser = this.authService.subUser;
    this.getMyListMovies();
  }

  getMyListMovies() {
    this.movieService.getMyListMovies().subscribe(movies => {
      this.myLists = movies.map(movie => {
        return {
          id: movie.id,
          title: movie.name,
          url: movie['horizontal_image_path'],
          preview: movie['sample_video_file'],
        };
      });
      this.parseMyList();
    });
  }

  parseMyList() {
    this.sliderNums = Math.ceil(this.myLists.length / 6);
    this.sliderLines = Array.from(Array(this.sliderNums), () => Array());
    for (let i = 0; i < this.sliderNums; i++) {
      this.sliderLines[i] = this.myLists.slice(i * 6, (i + 1) * 6);
    }
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

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
