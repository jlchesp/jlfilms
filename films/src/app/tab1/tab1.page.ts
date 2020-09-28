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

  constructor( private movieService: MoviesService) {}

  ngOnInit(){
    this.movieService.getFeature()
      .subscribe(res =>{
        this.recentMovies = res.results;
        console.log(res);
      });
  }

}
