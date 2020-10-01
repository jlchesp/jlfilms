import { MoviesService } from './../services/movies.service';
import { DataLocalService } from './../services/data-local.service';
import { Genre, MovieDetail } from './../Interfaces/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  movies: MovieDetail[] = [];
  genres: Genre[] = [];
  favoriteGenre: any[] = [];

  constructor(private dataLocal: DataLocalService, private moviesService: MoviesService) { }

  async ionViewWillEnter() {
    this.movies = await this.dataLocal.loadFav();
    this.genres = await this.moviesService.loadGenre();
    this.moviesForGenre(this.genres, this.movies);
  }

  moviesForGenre(genres: Genre[], movies: MovieDetail[]) {

    this.favoriteGenre = [];

    genres.forEach(genero => {
      this.favoriteGenre.push({
        genero: genero.name,
        movs: movies.filter(mov => {
          return mov.genres.find(genre => genre.id === genero.id);
        })
      });
    });

    console.log(this.favoriteGenre);

  }

}
