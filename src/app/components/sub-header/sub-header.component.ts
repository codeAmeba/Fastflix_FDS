import {
  Component,
  OnInit,
  AfterContentChecked,
  EventEmitter,
  Output,
} from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { Router } from '@angular/router';
import { MovieGenres } from 'src/app/models/movieGenres';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-sub-header',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(150, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(150, style({ opacity: 0 })),
      ]),
    ]),
  ],
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.css'],
})
export class SubHeaderComponent implements OnInit, AfterContentChecked {
  showGenre: boolean;
  isGrid: boolean;
  showGridMenu: boolean;
  currentRouting: string;
  genreList: string[];
  @Output() selectedGenre = new EventEmitter();

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.showGenre = false;
    this.isGrid = false;
    this.showGridMenu = false;
    this.currentRouting = this.router.url;
    this.genreList = MovieGenres.map(({ category }) => category);
  }

  filterGenre(genre: string) {
    this.movieService.Genre = genre;
    this.selectedGenre.emit();
  }

  ngAfterContentChecked() {
    this.currentRouting = this.router.url;
  }
}
