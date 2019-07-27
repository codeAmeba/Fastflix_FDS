import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { MovieService } from 'src/app/services/movie.service';

interface Movie {
  id: number;
  name: string;
  horizontal_image_path: string;
  vertical_image: string;
}

@Component({
  selector: 'app-signup-step4',
  templateUrl: './signup-step4.component.html',
  styleUrls: ['./signup-step4.component.css'],
})
export class SignupStep4Component implements OnInit {
  activeSubmit: boolean;
  animate: boolean;
  count: number;
  userName: string;
  movies: Movie[];
  selectedMovies: Movie[];

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private movieService: MovieService,
    private router: Router
  ) {}

  ngOnInit() {
    this.activeSubmit = false;
    this.animate = false;
    this.count = 0;
    this.userName = this.authService.userName;
    this.movies = [];
    this.selectedMovies = [];
    this.getPreMovies();
  }

  getPreMovies() {
    this.userService.getPreMovies().subscribe(movies => {
      this.movies = movies;
      console.log(this.movies);
    });
  }

  toggleSelected(event: [HTMLElement, Movie]) {
    const target = <HTMLElement>event[0].closest('.box');
    const movie = event[1];

    if (this.count < 3 && target.classList.contains('not-selected')) {
      this.selectedMovies = [...this.selectedMovies, movie];
      this.count += 1;

      target.classList.add('selected');
      target.classList.remove('not-selected');
    } else if (target.classList.contains('selected')) {
      this.selectedMovies = this.selectedMovies.filter(mov => mov !== movie);

      this.count -= 1;

      target.classList.add('not-selected');
      target.classList.remove('selected');
    }

    this.activeSubmit = this.count === 3 ? true : false;
    this.animateCounter();

    console.log('selected Movies', this.selectedMovies);
  }

  animateCounter() {
    this.animate = true;
    setTimeout(() => {
      this.animate = false;
    }, 500);
  }

  onSubmit() {
    this.selectedMovies.forEach(({ id }) => {
      this.movieService.myList(id).subscribe(response => {
        console.log(response);
      });
    });

    this.router.navigate(['/home']);
  }
}
