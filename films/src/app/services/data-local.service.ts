import { MovieDetail } from './../Interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  movies: MovieDetail[] = [];

  constructor(private storage: Storage, private toastController: ToastController) {
    this.loadFav();
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  saveMovie(movie: MovieDetail) {
    let exists = false;
    let message = '';

    for (const mov of this.movies) {
      if (mov.id === movie.id) {
        exists = true;
        break;
      }
    }

    if (exists) {
      this.movies = this.movies.filter(mov => mov.id !== movie.id);
      message = 'Removed from favorites';
    } else {
      this.movies.push(movie);
      message = 'Added to favorites';
    }
    this.presentToast(message);
    this.storage.set('movies', this.movies);
    return !exists;
  }

  async loadFav() {
    const movies = await this.storage.get('movies');
    this.movies = movies || [];
    return this.movies;
  }

  async movieExist(id) {
    await this.loadFav();
    const exists = this.movies.find(mov => mov.id === id);
    return (exists) ? true : false;
  }
}
