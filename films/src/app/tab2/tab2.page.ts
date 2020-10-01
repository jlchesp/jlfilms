import { ModalController } from '@ionic/angular';
import { MoviesService } from './../services/movies.service';
import { Component } from '@angular/core';
import { Movie } from '../Interfaces/interfaces';
import { DetailComponent } from '../components/detail/detail.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  searchTxt = '';
  movies: Movie[] = [];
  suggestions: string[] = ['Batman', 'Superman', 'Wonder Woman', 'Justice League', 'Avengers', 'The Lord of the Rings', 'The Godfather', 'Joker', 'Taxi Driver', 'Midsommar', 'Harry Potter', 'Origen'];
  searching = false;

  constructor(private moviesService: MoviesService, private modalCtrl: ModalController) { }

  search(event) {

    const value: string = event.detail.value;

    if (value.length === 0) {
      this.searching = false;
      this.movies = [];
      return;
    }

    this.searching = true;
    this.moviesService.searchMovie(value)
      .subscribe(res => {
        this.movies = res['results'];
        this.searching = false;
      });
  }

  async details(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetailComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }

}
