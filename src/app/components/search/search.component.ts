import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviePreview } from 'src/app/models/movie-preview';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchMovies: MoviePreview[];
  query: string;

  sliderNums: number;
  sliderLines: MoviePreview[][];

  openedCategory: string;
  relatedContents: string[];

  searchOK: boolean;
  navigationSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private router: Router
  ) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.searchOK = true;
    this.route.paramMap.subscribe(params => {
      this.query = params.get('query');
      console.log('query', this.query);
      this.searchService.searchMovies(this.query).subscribe(
        response => {
          this.searchOK = true;
          console.log('search response', response);
          this.relatedContents = response.contents;
          this.searchMovies = response['first_movie'].map(movie => {
            return {
              id: movie.id,
              title: movie.name,
              url: movie['horizontal_image_path'],
              preview: movie['sample_video_file'],
            };
          });
          this.searchMovies = [
            ...this.searchMovies,
            ...response['other_movie'].map(movie => {
              return {
                id: movie.id,
                title: movie.name,
                url: movie['horizontal_image_path'],
                preview: movie['sample_video_file'],
              };
            }),
          ];
          console.log('content', this.relatedContents);
          console.log('movies', this.searchMovies);
          this.parseMyList();
        },
        error => {
          console.error(error);
          this.searchOK = false;
          this.relatedContents = [];
          this.searchMovies = [];
        }
      );
    });
  }

  parseMyList() {
    this.sliderNums = Math.ceil(this.searchMovies.length / 6);
    this.sliderLines = Array.from(Array(this.sliderNums), () => Array());
    console.log(this.sliderNums);
    for (let i = 0; i < this.sliderNums; i++) {
      this.sliderLines[i] = this.searchMovies.slice(i * 6, (i + 1) * 6);
      console.log(this.sliderLines);
    }
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
  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }
}
