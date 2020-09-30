import { Component, OnInit } from '@angular/core';
import { Movie } from '../Interfaces/interfaces';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  recentMovies: Movie[] = [];
  popular: Movie[] = [];

  constructor(private movieService: MoviesService) { }

  ngOnInit() {

    this.movieService.getFeature()
      .subscribe(res => {
        this.recentMovies = res.results;
      });

    this.getPopular();

  }

  getPopular() {
    this.movieService.getPopular()
      .subscribe(res => {
        const temp = [...this.popular, ...res.results];
        this.popular.push(...res.results);
        this.popular = temp;
      });
  }

  moreFilms() {
    this.getPopular();
  }

}
